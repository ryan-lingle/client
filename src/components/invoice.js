import React from 'react';
import QRCode from 'qrcode.react'
import { requestProvider } from 'webln'
import { withApollo } from 'react-apollo'
import { SUBSRIBE_INVOICE } from '../actions'
import Tooltip from "./tooltip";

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false
    }
    this.subscribe();
  }

  joule = () => {
    requestProvider().then((webln) => {
      webln.sendPayment(this.props.invoice)
    })
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
        <h4 id="invoice-satoshis"><span className="font-weight-bol">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</span> Satoshis</h4>
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
          handleInvoicePaid()
        }
      },
      error(err) { console.error('err', err); },
    });
  }

  render() {
    const { satoshis, invoice } = this.props;
    if (this.state.showQR) return this.qrCode();
    return(
      <div id="invoice">
        <h4 id="invoice-header">Invoice</h4>
        <h4 id="invoice-satoshis"><span className="font-weight-bol">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</span> Satoshis</h4>

        <button className="btn-secondary invoice-btn" onClick={this.showQR}>Show QR Code</button>
        <button className="joule-btn invoice-btn" onClick={this.joule} >Pay with Joule</button>
        <Tooltip tooltip={"Copy Invoice"} placement="bottom">
          <input className="payment-request invoice-btn" id="payment-request" value={invoice} readOnly={true} onClick={this.copyInvoice} />
        </Tooltip>
      </div>
    )
  }
}

export default withApollo(Invoice);
