import React from "react";
import { Modal } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import EpisodeSearch from "./episode_search";
import RekForm from "./rek_form";
import Invoice from "./invoice";

export default class RekModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen || false,
      step: 1,
      episodeId: null,
      satoshis: null,
      invoice: null,
    };

    if (this.props.episodeId) {
      this.state = {
        isOpen: this.props.isOpen || false,
        step: 2,
        episodeId: this.props.episodeId,
        satoshis: null,
        invoice: null,
      };
    }
  }

  onChildClick = () => {
    this.setState({ isOpen: true })
  }

  closeModal = () => {
    this.setState({ isOpen: false, step: 1 })
  }

  handleEpisodeSelection = (episodeId) => {
    this.setState({ episodeId, step: 2 })
  }

  handleInvoice = ({ invoice, satoshis }) => {
    if (invoice) {
      this.setState({ invoice, satoshis, step: 3})
    } else {
      this.setState({ step: 1, isOpen: false })
      NotificationManager.info('Rek Created');
    }
  }

  handleInvoicePaid = () => {
    this.setState({ isOpen: false })
    NotificationManager.info('Rek Created');
  }

  renderStep = (step) => {
    const { episodeId, invoice, satoshis } = this.state;
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
