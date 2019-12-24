import React from "react";
import { Wallet } from ".";

const UserWallet = ({ satoshis }) => {
  return(
    <Wallet satoshis={satoshis} >
      {({ deposit, withdraw }) => (
        <div id="wallet">
          <div className="satoshi-amount" id="wallet-amount">
            <div className="wallet-satoshis">{satoshis.toMoney()}</div>
            <div> sats</div>
          </div>
          <div id="wallet-actions">
            <div className="wallet-line">a</div>
            <div className="wallet-action" onClick={deposit} >Deposit</div>
            <div className="wallet-line">a</div>
            <div className="wallet-action" onClick={withdraw} >Withdraw</div>
          </div>
        </div>)
      }
    </Wallet>
  )
}

export default UserWallet;
