import React from "react";
import { Modal } from "react-bootstrap"
import SatoshiInput from "./satoshi_input";
import Invoice from "./invoice"
import { ErrorMessage } from ".";
import { Mutation, withApollo } from "react-apollo";
import { DEPOSIT, WITHDRAW, CURRENT_SATS } from "../actions";
import { NotificationManager } from 'react-notifications';
import { requestProvider } from 'webln'

class Wallet extends React.Component {

  constructor(props) {
    super(props);

    this.props.client.query({
      query: CURRENT_SATS
    }).then(({ data }) => this.currentSats = data.currentUser.satoshis);

    this.state = {
      satoshis: 10000,
      withdraw: false,
      deposit: false,
      joule: true,
      invoice: null,
      error: null
    }

    this.invoice = React.createRef();
  }



  handleSatoshiUpdate = (satoshis) => {
    this.setState({ satoshis })
  }

  requestInvoice = async (satoshis) => {
    try {
      const webln = await requestProvider();
      const { paymentRequest } = await webln.makeInvoice({
        defaultAmount: this.state.satoshis,
        defaultMemo: "Rekr Widthdrawal"
      })

      this.submitInvoice(paymentRequest);

    } catch(error) {
      this.setState({ joule: false });
    }
  }

  submitInvoice = async (invoice) => {
    try {
      const { data } = await this.props.client.mutate({
        mutation: WITHDRAW,
        variables: {
          invoice
        }
      });

      if (data.withdraw.success) window.location.reload();

    } catch(error) {
      this.setState({ error })
    }
  }

  closeModal = () => {
    this.setState({ withdraw: false, deposit: false, invoice: null })
  }

  handleInvoice = ({ deposit }) => {
    const { invoice, satoshis } = deposit;
    this.setState({ invoice, satoshis, withdraw: false, deposit: false })
  }

  handleInvoicePaid = () => {
    this.setState({ invoice: null })
    NotificationManager.info('Deposit Created');
  }


  deposit = () => {
    this.setState({ deposit: true })
  }

  withdraw = () => {
    if (this.currentSats > 0) this.setState({ withdraw: true })
  }

  buildModal = () => {
    const { invoice, withdraw, deposit, satoshis, error, joule } = this.state;
    let modalContent;

    if (invoice) {
      modalContent = (
        <Invoice
          invoice={invoice}
          satoshis={satoshis}
          handleInvoicePaid={this.handleInvoicePaid}
        />
      )
    } else if (deposit) {
      modalContent = (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Deposit</Modal.Title>
          </Modal.Header>
          <div id="deposit-modal">
            <SatoshiInput onUpdate={this.handleSatoshiUpdate} />
            <Mutation mutation={DEPOSIT} onCompleted={this.handleInvoice}>
              {(withdrawInvoice, {error, data}) => (
                <input type="submit" value="Deposit" className="btn btn-primary rek-submit" onClick={(e) => {
                  e.preventDefault()
                  withdrawInvoice({ variables: { satoshis: this.state.satoshis }})
                }}/>
              )}
            </Mutation>
          </div>
        </div>
      )
    } else if (withdraw) {
      modalContent = (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Withdraw</Modal.Title>
          </Modal.Header>
          <div id="deposit-modal">
            {joule ?
              <div>
                <ErrorMessage error={error} />
                <SatoshiInput onUpdate={this.handleSatoshiUpdate} max={this.currentSats} />
                <br></br>
                <input type="submit" value="Withdraw" className="btn btn-primary rek-submit" onClick={async (e) => {
                  this.requestInvoice(this.state.satoshis)
                }} />
              </div>
              : <div>
                  <div id="joule-msg">We recommend getting the <a target="_blank" rel="noopener noreferrer" href="https://lightningjoule.com/">Joule Chrome Extension</a> for a Better User Experience.</div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    this.submitInvoice(this.invoice.current.value);
                  }}>
                    <input ref={this.invoice} className="form-control" placeholder="Enter a Lightning Invoice..." />
                    <br></br>
                    <input type="submit" value="Withdraw" className="btn btn-primary" />
                  </form>
                </div>}
          </div>
        </div>
      )
    };

    return(
      <Modal show={true} onHide={this.closeModal}>
        {modalContent}
      </Modal>
    )
  }

  render() {
    const { invoice, withdraw, deposit } = this.state;
    return(
      <div id="wallet">
        {(invoice || withdraw || deposit) ? this.buildModal() : null}
        <div className="satoshi-amount" id="wallet-amount">
          <div className="wallet-satoshis">{this.props.satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
          <div> sats</div>
        </div>
        <div id="wallet-actions">
          <div className="wallet-line">a</div>
          <div className="wallet-action" onClick={this.deposit} >Deposit</div>
          <div className="wallet-line">a</div>
          <div className="wallet-action" onClick={this.withdraw} >Withdraw</div>
        </div>
      </div>
    )
  }
}

export default withApollo(Wallet);
