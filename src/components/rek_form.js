import React from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { Query, Mutation } from "react-apollo";
import { GET_EPISODE, CREATE_REK } from "../actions"

export default class RekForm extends React.Component {

  state = {
    satoshis: "",
  }

  handleInvoice = ({ createRek }) => {
    this.props.handleInvoice(createRek)
  }

  handleChange = ({ target }) => {
    this.setState({ satoshis: parseInt(target.value) })
  }

  render() {
    const id = parseInt(this.props.id);
    const { satoshis } = this.state;
    return(
      <Query query={GET_EPISODE} variables={{ id }} >
        {({ data, loading, error }) => {
          if (loading) return <p>LOADING</p>;
          if (error) return <p>ERROR</p>;
          const { title, podcast } = data.episode;
          return (
            <div>
              <div id="episode-info">
                <img src={podcast.image} width="100px" alt="podcast art"/>
                <div>{title}</div>
              </div>
              <Form inline id="rek-form">
                <Form.Text>Put your Sats where your mouth is...</Form.Text>
                <FormControl
                  id="satoshi-input"
                  type="number"
                  value={satoshis.toString()}
                  onChange={this.handleChange}
                  placeholder="Donation Amount in Satoshis"
                />
                <Mutation mutation={CREATE_REK} onCompleted={this.handleInvoice}>
                  {(createRek, {error, data}) => (
                    <FormControl type="submit" value="Rek" className="btn btn-primary" onClick={(e) => {
                      e.preventDefault()
                      createRek({ variables: { episodeId: id, satoshis }})
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
