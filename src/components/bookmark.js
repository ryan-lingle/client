import React from "react";

const Bookmark = () => {
  const clickityClick = ({ target }) => {
    target.classList.toggle("far");
    target.classList.toggle("fa");
    if (target.style.color === "rgb(0, 215, 46)") {
      target.style.color = "#657786"
    } else {
      target.style.color = "rgb(0, 215, 46)"
    }
  }
  return(
    <i className="far fa-bookmark bookmark" onClick={clickityClick} ></i>
  )
}

export default Bookmark;
