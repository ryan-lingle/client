import React from "react";
import LoaderSpinner from 'react-loader-spinner';

const Loader = (props) => {
  return(
    <div className="text-center">
      <LoaderSpinner
       type="Oval"
       color="#00d72e"
       height={"50" || props.size}
       width={"50" || props.size}
      />
    </div>
  )
}

export default Loader;
