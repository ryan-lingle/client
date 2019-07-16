import React from 'react';
import QRCode from 'qrcode.react'
import { requestProvider } from 'webln'
import { FormControl } from 'react-bootstrap'
import { withApollo } from 'react-apollo'
import { SUBSRIBE_INVOICE } from '../actions'

const Invoice = ({ id, invoice, satoshis, client, handleInvoicePaid }) => {
  function joule() {
    requestProvider().then((webln) => {
      webln.sendPayment(invoice)
    })
  }

  function copyInvoice() {
    const invoice = document.querySelector(`#payment-request`);
    invoice.select();
    document.execCommand("copy");
  }

  function subscribe() {
    client.subscribe({
        query: SUBSRIBE_INVOICE,
        variables: { id },
      }).subscribe({
        next({ data }) {
          handleInvoicePaid()
        },
        error(err) { console.error('err', err); },
      });
  }

  subscribe();

  return(
    <div id="invoice">
      <div className="invoice-flex">
        <h4>{satoshis} Sat Rek</h4>
        <button className="joule-btn btn" onClick={joule} >Pay with Joule</button>
      </div>
      <QRCode value={invoice} size={200}/>
      <div className="invoice-flex">
        <FormControl className="payment-request" id="payment-request" value={invoice} readOnly={true} />
        <button className="btn-secondary btn" id="copy-btn" onClick={copyInvoice}>Copy Invoice</button>
      </div>
    </div>
  )
}

export default withApollo(Invoice);
