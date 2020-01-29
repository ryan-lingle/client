import React from 'react';
import QRCode from 'qrcode.react'
import { requestProvider } from 'webln'
import { withApollo } from 'react-apollo'
import { SUBSRIBE_INVOICE } from '../actions'
import Tooltip from "./tooltip";
import { toSats } from "../utils";

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false,
      weblnError: false
    }

    this.subscribe();
    this.joule();
  }

  joule = async () => {
    try {
      const webln = await requestProvider();
      webln.sendPayment(this.props.invoice)
    } catch(err) {
      this.setState({ weblnError: true });
    }
  }

  showQR = () => {
    this.setState({
      showQR: true
    })
  }

  qrCode = () => {
    const { satoshis, invoice } = this.props;
    return(
      <div className="text-center">
        <div className="back-btn fa fa-arrow-left" onClick={() => { this.setState({ showQR: false })}}></div>
        <h4 id="invoice-satoshis"><span className="font-weight-bol">{toSats(satoshis)}</span></h4>
        <QRCode value={invoice} fgColor={'#404040'} size={250} id="qr-code" />
      </div>
    )
  }

  copyInvoice() {
    const invoice = document.querySelector(`#payment-request`);
    invoice.select();
    document.execCommand("copy");
  }

  subscribe = () => {
    const { client, invoice, handleInvoicePaid } = this.props;
    client.subscribe({
      query: SUBSRIBE_INVOICE,
      variables: { invoice },
    }).subscribe({
      next({ data }) {
        if (data.invoicePaid.invoice === invoice) {
          handleInvoicePaid(data.invoicePaid.rekId, data.invoicePaid.userId);
        }
      },
      error(err) { console.error('bla', err); },
    });
  }


  render() {
    const { satoshis, invoice } = this.props;
    if (this.state.showQR) return this.qrCode();
    return(
      <div id="invoice">
        <div className="no-wallet-msg">
          No lightning wallet?
          We recommend <a target="_blank" href={"https://breez.technology/"}>Breez</a> for mobile
          and <a target="_blank" href={"https://zap.jackmallers.com"}>Zap</a> for desktop.
        </div>
        <h4 id="invoice-header">Invoice</h4>
        <h4 id="invoice-satoshis"><span className="font-weight-bol">{toSats(satoshis)}</span></h4>
        <button className="btn-secondary invoice-btn" onClick={this.showQR}>Show QR Code</button>
        <a className="joule-btn invoice-btn" href={`lightning:${invoice}`} >Pay Invoice</a>
        <Tooltip tooltip={"Copy Invoice"} placement="bottom">
          <input className="payment-request invoice-btn" id="payment-request" value={invoice} onClick={this.copyInvoice} />
        </Tooltip>
      </div>
    )
  }
}

export default withApollo(Invoice);
