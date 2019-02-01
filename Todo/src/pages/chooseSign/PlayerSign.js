import React, { Component } from 'react';


import './playerSign.scss';
import { Popup } from "../modal";

export class ChooseSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signChoosed: false,
      buttonDisable: false,
      activatePopup: false,
    };
  }

  handleClick = (event) => {

    if (this.state.buttonDisable) {
      this.props.startGame(false);
      console.log('01');
      this.setState(currentState => ({
        buttonDisable: currentState.buttonDisable = false,
      }));
    } else {
 //     this.props.playerSign(event.target.value);
      this.setState({
        signChoosed: true,
        buttonDisable: false,
      });
    }
    this.props.playerSign(event.target.value);
  };

  handleSubmit = (event) => {

    if (this.state.signChoosed) {
      this.props.startGame(true);
      this.setState(currentState => ({
        buttonDisable: currentState.buttonDisable = true,
      }));
    } else {
      this.popupText = 'You need to choose your sign before start';
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
    return (

      <React.Fragment>

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
            <label
              htmlFor="X"
              className="sign-button"
            >
              {'X'}
            </label>
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
            <label
              htmlFor="O"
              className="sign-button"
            >
              {'O'}
            </label>
          </div>
          <h4 className="sign-text">
            {[<b key={"0010101"}>X</b>, ' - always go first']}
          </h4>
          <button
            type="submit"
            className="start-button"
            disabled={this.state.buttonDisable}
          >
            {'Start new game'}
          </button>

        </form>

        <Popup activatePopup={this.state.activatePopup} text={this.popupText}/>

      </React.Fragment>

    );
  }
}
