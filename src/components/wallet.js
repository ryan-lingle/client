import React from "react";
import { Modal, FormControl } from "react-bootstrap"
import SatoshiInput from "./satoshi_input";
import Invoice from "./invoice"
import { Mutation } from "react-apollo";
import { WITHDRAW } from "../actions";
import { NotificationManager } from 'react-notifications';

// import ErrorMessage from "./error_msg";

export default class Wallet extends React.Component {

  state = {
    satoshis: 10000,
    withdraw: false,
    deposit: false,
    invoice: null,
  }

  handleSatoshiUpdate = (satoshis) => {
    this.setState({ satoshis })
  }

  closeModal = () => {
    this.setState({ withdraw: false, deposit: false, invoice: null })
  }

  handleInvoice = ({ withdrawInvoice }) => {
    const { invoice, satoshis } = withdrawInvoice;
    this.setState({ invoice, satoshis, withdraw: false, deposit: false })
  }

  handleInvoicePaid = () => {
    this.setState({ invoice: null })
    NotificationManager.info('Deposit Created');
  }


  deposit = () => {
    this.setState({ deposit: true })
  }

  widthdraw = () => {
    this.setState({ withdraw: true })
  }

  buildModal = () => {
    const { invoice, withdraw, deposit, satoshis } = this.state;
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
        <div id="deposit-modal">
          <SatoshiInput onUpdate={this.handleSatoshiUpdate} />
          <Mutation mutation={WITHDRAW} onCompleted={this.handleInvoice}>
            {(withdrawInvoice, {error, data}) => (
              <FormControl type="submit" value="Deposit" className="btn btn-primary rek-submit" onClick={(e) => {
                e.preventDefault()
                withdrawInvoice({ variables: { satoshis: this.state.satoshis }})
              }}/>
            )}
          </Mutation>
        </div>
      )
    }

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
          <div> Satoshis</div>
        </div>
        <div id="wallet-actions">
          <div className="wallet-line">a</div>
          <div className="wallet-action" onClick={this.deposit} >Deposit</div>
          <div className="wallet-line">a</div>
          <div className="wallet-action" onClick={this.widthdraw} >Withdraw</div>
        </div>
      </div>
    )
  }
}
