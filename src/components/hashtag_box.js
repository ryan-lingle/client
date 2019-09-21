import React from "react";
import HashtagCard from "./hashtag_card";
import { withApollo } from "react-apollo";
import { SUBSRIBE_HASHTAGS } from '../actions'

class HashtagBox extends React.Component {
  state = {
    hashtags: this.props.hashtags
  }

  componentDidMount() {
    const comp = this;
    this.props.client.subscribe({
      query: SUBSRIBE_HASHTAGS
    }).subscribe({
      next({ data: { hashtags } }) {
        comp.handleUpdate(hashtags);
      },
      error(err) { console.error(err); },
    });
  }

  handleUpdate = ({ follow, hashtag }) => {
    follow ? this.addHashtag(hashtag) : this.removeHashtag(hashtag.id);
  }

  addHashtag = (hashtag) => {
    this.setState(({ hashtags }) => {
      hashtags.push(hashtag);
      return { hashtags };
    })
  }

  removeHashtag = (id) => {
    this.setState(({ hashtags }) => {
      const newHashtags = hashtags.filter(hashtag => hashtag.id !== id.toString());
      return { hashtags: newHashtags };
    })
  }

  render() {
    const { hashtags } = this.state;
    return(
      <div id="hashtag-box">
        <h3 id="hashtag-box-heading">Followed Topics</h3>
        <div className="hashtags">
          {hashtags.length > 0 ?
            hashtags.map(hashtag =>
              <HashtagCard {...hashtag} key={hashtag.id} width={"100%"} X={true}/>)
              : <div id="no-topic-msg">
                  <div>You aren't following any Topics yet.</div>
                  <br></br>
                  <div>Recomended Topics:</div>
                  <a href="/hashtag/bitcoin">bitcoin</a>
                </div>}
        </div>
      </div>
    )
  }
}

export default withApollo(HashtagBox);
