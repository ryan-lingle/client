import React from "react";

const PodcastSmall = ({ title, image, slug}) => {
  return(
    <a className="item podcast-small" href={`/podcast/${slug}`} >
      <img src={image} width="80px" alt="podcast art"/>
      <div>{title}</div>
    </a>
  )
}

export default PodcastSmall;
