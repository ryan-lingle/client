import React from "react";
import { withApollo } from "react-apollo";
import { Table, Toggle, Tooltip } from "../../components";
import { GUEST_SHARE } from "../../actions";
import GuestSharingModal from "./guest_sharing_modal";
import GuestTaggingModal from "./guest_tagging_modal";

class Podcast extends React.Component {
  state = {
    editGuestSharing: false,
    guestShare: this.props.guestShare,
    selectedEpisodes: [],
    tagGuests: false,
  }

  componentWillReceiveProps({ guestShare }) {
    this.setState({ guestShare: guestShare })
  }

  handleGuestToggle = async ({ checked, podcastId }) => {
    if (checked) {
      this.setState({ editGuestSharing: true })
    } else {
      this.props.client.mutate({
        mutation: GUEST_SHARE,
        variables: { percentage: 0, podcastId }
      })
      this.setState({ guestShare: 0 })
    }
  }

  tagGuests = (mutaiton) => {
    const { selectedEpisodes } = this.state;
    if (selectedEpisodes.length < 1) {
      window.alert("You must have at least one episode selected.")
    } else {
      this.setState({ tagGuests: true })
    }
  }

  selectEpisode = ({ checked }, id) => {
    this.setState(prevState => {
      if (checked) {
        prevState.selectedEpisodes.push(id);
      } else {
        const i = prevState.selectedEpisodes.indexOf(id);
        if (i > -1) prevState.selectedEpisodes.splice(i, 1);
      }
      return { selectedEpisodes: prevState.selectedEpisodes }

    })
  }

  render() {
    const { id, title, image, description, donationSum, donationCount, episodes } = this.props;
    return(
      <div>
        <GuestSharingModal
          show={this.state.editGuestSharing}
          podcastId={id}
          close={() => this.setState({ editGuestSharing: false })}
          onEdit={(percent) => this.setState({ editGuestSharing: false, guestShare: percent })}
        />
        <GuestTaggingModal
          show={this.state.tagGuests}
          podcastId={id}
          episodeIds={this.state.selectedEpisodes}
          close={() => this.setState({ tagGuests: false })}
        />
        <div className="pd-top">
          <div>
            <h3 id="pd-ptitle">{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: description }} ></p>
            <div id="pd-info">
              <div className="pd-item">
                <h4># of Donations</h4>
                <div className="pd-count">{donationCount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
              </div>
              <div className="pd-item">
                <h4>$ of Donations</h4>
                <div className="pd-count">{donationSum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})} sats</div>
              </div>
            </div>
          </div>
          <img src={image} alt="podcast art" className="podcast-art" width="250px"/>
        </div>
        <div className="pd-bottom">
          <div className="guest-sharing">
            <h4>Guest Percentage</h4>
            <div className="pd-count">{this.state.guestShare * 100}%</div>
          </div>
          <div className="guest-sharing">
            <h4>Enable Guest Sharing</h4>
            <Toggle
              on={this.state.guestShare !== 0}
              onChange={(checked) => this.handleGuestToggle({ checked, podcastId: id })}
              customeClass={"guest-toggle"}
            />
          </div>
          {this.state.guestShare !== 0 ?
            <button className="btn btn-secondary" onClick={this.tagGuests}>Bulk Tag</button>
            : null}
        </div>
        <div id="pd-episodes">
          <Table
            schema={this.episodeTableSchema}
            data={episodes}
          />
        </div>
      </div>
    )
  }

  episodeTableSchema = {
    id: {
      title: "",
      children: ({ id }) => <input type="checkbox" onChange={({ target }) => this.selectEpisode(target, id)}/>
    },
    title: {
      title: "Title",
      format: "string"
    },
    donationSum: {
      title: "Sats Donated",
      format: "integer"
    },
    released: {
      title: "Released",
      format: "date"
    },
    __: {
      title: "",
      format: "btn",
      children: ({ id }) => {
        return this.state.guestShare !== 0 ?
          <Tooltip tooltip={"Guests"} >
            <div className="tag-guest fa fa-users" onClick={({ target }) => this.setState({ tagGuests: true, selectedEpisodes: [id] })}></div>
          </Tooltip>
        : null
      }
    },
  }
}

export default withApollo(Podcast);
