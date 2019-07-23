import React from 'react'

function generateValues() {
  const vals = [];
  let val = 100;
  vals.push(val);
  while (val < 1000000) {
    val += (10 ** (val.toString().length - 1));
    vals.push(val);
  }
  return vals;
}

const values = generateValues();

export default class SatoshiInput extends React.Component {
  state = {
    index: 18
  }

  handleChange = ({ target }) => {
    const index = parseInt(target.value);
    this.setState({ index });
    this.props.onUpdate(values[index])
  }

  render() {
    const { index } = this.state;
    const satoshis = values[index];

    return(
      <div id="satoshi-input-container">
        <div className="satoshi-amount" id="rek-form-satoshis">
          <div className="wallet-satoshis">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
          <div> Satoshis</div>
        </div>
        <input
          id="satoshi-input"
          className="slider"
          type="range"
          value={index}
          onChange={this.handleChange}
          max={36}
        />
      </div>
    )
  }
}
