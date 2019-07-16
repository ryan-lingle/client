import React from "react";
import { Modal } from "react-bootstrap"
import { NotificationManager } from 'react-notifications';

import EpisodeSearch from "./episode_search"
import RekForm from "./rek_form"
import Invoice from "./invoice"

export default class RekModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      step: 1,
      episodeId: null,
      satoshis: null,
      invoice: null,
      invoiceId: null,
    };
  }

  onChildClick = () => {
    this.setState({ isOpen: true })
  }

  closeModal = () => {
    this.setState({ isOpen: false })
  }

  handleEpisodeSelection = (episodeId) => {
    this.setState({ episodeId, step: 2 })
  }

  handleInvoice = ({ invoice, satoshis, invoiceId}) => {
    this.setState({ invoice, satoshis, invoiceId, step: 3})
  }

  handleInvoicePaid = () => {
    this.setState({ isOpen: false })
    NotificationManager.info('Donation Created');
  }

  renderStep = (step) => {
    const { episodeId, invoice, invoiceId, satoshis } = this.state;
    return {
      1: () => {
        return(
          <EpisodeSearch
            handleSelection={this.handleEpisodeSelection}
          />
        )
      },
      2: () => {
        return(
          <RekForm
            id={episodeId}
            handleInvoice={this.handleInvoice}
          />
        )
      },
      3: () =>{
        return(
          <Invoice
            invoice={invoice}
            id={invoiceId}
            satoshis={satoshis}
            handleInvoicePaid={this.handleInvoicePaid}
          />
        )
      }
    }[step]();
  }

  render() {
    const children = React.Children.map(this.props.children, child => React.cloneElement(child, { onClick: this.onChildClick }));
    return(
      <div id="rek-modal">
        {children}
        <Modal
          show={this.state.isOpen}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Make a Rek</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderStep(this.state.step)}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
