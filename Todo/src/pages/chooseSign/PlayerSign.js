import React, {Component} from 'react';

import './playerSign.scss';
import {Popup} from '../popup';

export class ChooseSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signChoosed: false,
      activatePopup: false
    };
  }

  handleClick = (event) => {
    this.props.playerSign(event.target.value);
    this.setState({
      signChoosed: true,
    });
  };

  handleSubmit = (event) => {
  //  console.log(this.state.signChoosed, this.state.activatePopup);
    if (this.state.signChoosed) {
      this.props.startGame(true);
    } else {
      this.setState(currentState => ({
        activatePopup: currentState.activatePopup = true,
      }), () => {
        this.setState({
          activatePopup: false,
        });
          });
    }
    event.preventDefault();
  };

  render() {
    const {activatePopup} = this.state;
    return (
        <form className="your-sign" onSubmit={this.handleSubmit}>
          <h3 className="sign-text">Choose your sign</h3>
          <div className="sign-box">
            <input
                type="radio"
                id="X"
                name="your sign"
                className="sign-input"
                placeholder="Choose Your Sign"
                value="X"
                hidden={true}
                onClick={this.handleClick}
            />
            <label htmlFor="X" className="sign-button">X</label>
          </div>

          <div className="sign-box">
            <input
                type="radio"
                id="O"
                name="your sign"
                className="sign-input"
                placeholder="Choose Your Sign"
                value="O"
                hidden={true}
                onClick={this.handleClick}
            />
            <label htmlFor="O" className="sign-button">O</label>
          </div>
          <h4 className="sign-text"><b>X</b> - always go first</h4>
          <button
              type="submit"
              className="start-button"
          >
            Start new game
          </button>
          <Popup activatePopup={activatePopup} text={['You need to pick your sign first ',<b>X</b>,' or ',<b>O</b>]} delay={3000} />
        </form>
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



