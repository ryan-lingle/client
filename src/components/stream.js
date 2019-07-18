import React from "react";
import Rek from "./rek";
import User from "./user";

export default class Stream extends React.Component {
  state = {
    feed: this.props.feed
  }

  component = () => {
    return {
      reks: Rek,
      following: User,
      followers: User,
    }[this.props.type];
  }


  componentWillReceiveProps({ feed }) {
    this.setState({ feed })
  }

  render() {
    console.log(this.props)
    const Component = this.component();
    return(
      <div className="stream">
        {
          this.state.feed.map(item => <Component {...item} key={item.id}/>)
        }
      </div>
    )
  }
}
