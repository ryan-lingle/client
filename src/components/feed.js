import React from "react";
import Rek from "./rek";

export default class Feed extends React.Component {
  state = {
    reks: this.props.feed
  }

  render() {
    return(
      <div className="stream">
        {
          this.state.reks.map(rek => <Rek {...rek} key={rek.id}/>)
        }
      </div>
    )
  }
}

