import React from 'react'
import { Form } from 'react-bootstrap'
import { Query, Mutation, withApollo } from "react-apollo";
import { GET_EPISODE, CREATE_REK, CURRENT_SATS } from "../actions"
import { SatoshiInput, TagInput, TwitterSignIn, Toggle, ErrorMessage } from ".";

class RekForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      twitterSignIn: false,
      tweetRek: false,
      satoshis: 10000,
      tags: [],
    }

    this.props.client.query({
      query: CURRENT_SATS
    }).then(({ data }) => {
      this.walletPermission = data.currentUser.walletPermission;
      this.currentSats = data.currentUser.satoshis;
      this.canTweet = data.currentUser.canTweet;
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
        tweetRek: this.state.tweetRek,
        tags: this.state.tags,
        invoiceSatoshis,
        walletSatoshis
      }})
    }
  }

  handleInvoice = ({ createRek }) => {
    this.props.handleInvoice(createRek)
  }

  tweetRek = (checked) => {
    if (this.canTweet) {
      this.setState({ tweetRek: checked })
    } else {
      this.setState({ twitterSignIn: true })
    }
  }

  buildTwitterSignIn = () => {
    return(
      <div id="twitter-wrapper">
        <h2>Looks like you haven't connected your Twitter account!<br></br><br></br>Sign In to Continue.</h2>
        <TwitterSignIn />
      </div>
    )
  }

  render() {
    const id = parseInt(this.props.id);
    if (this.state.twitterSignIn) return this.buildTwitterSignIn();
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
                <div id="twitter-toggle">
                  <Toggle onChange={this.tweetRek} customeClass={"twitter-toggle"}/>
                  <div id="twitter-toggle-label">Tweet It</div>
                </div>
                <Mutation mutation={CREATE_REK} onCompleted={this.handleInvoice}>
                  {(createRek, {error, data}) => (
                    <div>
                      <ErrorMessage error={error} />
                      <input type="submit" value="Rek It" className="btn btn-primary rek-submit" onClick={(e) => {
                        e.preventDefault()
                        this.handleRekCreate(createRek)
                      }}/>
                    </div>
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
