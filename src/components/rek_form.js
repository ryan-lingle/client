import React from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { Query, Mutation, withApollo } from "react-apollo";
import { GET_EPISODE, CREATE_REK, CURRENT_SATS } from "../actions"
import { SatoshiInput, TagInput } from ".";

class RekForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      satoshis: 10000,
      tags: [],
    }

    this.props.client.query({
      query: CURRENT_SATS
    }).then(({ data }) => {
      this.walletPermission = data.currentUser.walletPermission;
      this.currentSats = data.currentUser.satoshis;
    })
  }


  handleChange = (satoshis) => {
    this.setState({ satoshis })
  }

  handleTagChange = (tags) => {
    this.setState({ tags });
  }

  handleRekCreate = (createRek) => {
    const invoiceSatoshis = this.state.satoshis - this.currentSats;
    const walletSatoshis = invoiceSatoshis > 0 ? this.currentSats : this.state.satoshis;
    if (
        walletSatoshis <= 0 ||
        (
          !this.walletPermission ||
          window.confirm(`Okay to Spend ${walletSatoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} Satohsis from your Rekr Wallet?`)
        )
      ) {
      createRek({ variables: {
        episodeId: this.props.id,
        tags: this.state.tags,
        invoiceSatoshis,
        walletSatoshis
      }})
    }
  }

  handleInvoice = ({ createRek }) => {
    this.props.handleInvoice(createRek)
  }

  render() {
    const id = parseInt(this.props.id);
    return(
      <Query query={GET_EPISODE} variables={{ id }} >
        {({ data, loading, error }) => {
          if (loading) return <p>LOADING</p>;
          if (error) return <p>ERROR</p>;
          const { title, podcast } = data.episode;
          return (
            <div>
              <div id="episode-info">
                <img src={podcast.image} id="rek-form-podcast-art" alt="podcast art"/>
                <div id="rek-form-episode">{title}</div>
              </div>
              <TagInput onUpdate={this.handleTagChange} />
              <SatoshiInput onUpdate={this.handleChange} />
              <Form inline id="rek-form">
                <Mutation mutation={CREATE_REK} onCompleted={this.handleInvoice}>
                  {(createRek, {error, data}) => (
                    <FormControl type="submit" value="Rek It" className="btn btn-primary rek-submit" onClick={(e) => {
                      e.preventDefault()
                      this.handleRekCreate(createRek)
                    }}/>
                  )}
                </Mutation>
              </Form>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withApollo(RekForm);
