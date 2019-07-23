import React from 'react';

const ErrorMessage = ({ error, position}) => {
  if (error && error.graphQLErrors) {
    const split = error.message.split(": ");
    const abs = position ? {
      position: "absolute",
      ...position
    } : null;
    return(
      <div style={abs} className="error pull-left">{split[split.length - 1]}</div>
    )
  } else return null;
}

export default ErrorMessage;
