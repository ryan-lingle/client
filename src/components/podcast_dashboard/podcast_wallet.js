import React from "react";
import { Wallet } from "../";

const PodcastWallet = (props) => {
  return(
    <Wallet {...props} >
      {({ withdraw }) => (
        <div id="podcast-wallet">
          <h4>Podcast Wallet</h4><div id="p-sats"><strong>{props.satoshis.toMoney()}</strong> Sats</div><button onClick={withdraw} className="btn btn-secondary">Withdraw</button>
        </div>
      )}
    </Wallet>
  )
}

export default PodcastWallet;
