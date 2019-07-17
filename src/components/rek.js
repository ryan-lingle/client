import React from 'react';

const Rek = (props) => {
  return(
    <div className="rek">
      {props.episode.title} | {props.satoshis} | {props.user.username}
    </div>
  )
}

export default Rek;
