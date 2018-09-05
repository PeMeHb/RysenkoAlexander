import React from 'react';


import './playerSign.scss';


export class ChooseSign extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    const target = event.target;
    this.props.playerSign(target.value)
  };

  render() {
    return (
        <div className="your-sing">
          <label className="sing-box">
            X
            <input
                type="radio"
                name="your sing"
                className="sing-input"
                placeholder="Choose Your Sing"
                value="X"
                onClick={this.handleClick}
            />

          </label>

          <label className="sing-box">
            O
            <input
                type="radio"
                name="your sing"
                className="sing-input"
                placeholder="Choose Your Sing"
                value="O"
                onClick={this.handleClick}
            />
          </label>
        </div>
    );
  }
}




/*

export const ChooseSign = ({ playerSign }) => {

  console.log(playerSign);

  const handleClick = (event) => {
    const target = event.target;
    if (target.value === "X") {
      playerSign = "X"
    } else {
      playerSign = "O"
    }
    console.log(playerSign);
  };

  return (
      <div className="your-sing">
        <label className="sing-box">
          X
          <input
              type="radio"
              name="your sing"
              className="sing-input"
              placeholder="Choose Your Sing"
              value="X"
              onClick={() => handleClick()}
          />

        </label>

        <label className="sing-box">
          O
          <input
              type="radio"
              name="your sing"
              className="sing-input"
              placeholder="Choose Your Sing"
              value="O"
              onClick={() => handleClick()}
          />
        </label>

      </div>

  );
};
*/



