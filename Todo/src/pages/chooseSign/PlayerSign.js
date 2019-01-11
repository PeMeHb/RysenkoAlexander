import React, { Component } from 'react';


import './playerSign.scss';

export class ChooseSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signChoosed: false,
    //  activatePopup: false
    };
  }

  handleClick = (event) => {
    this.props.playerSign(event.target.value);
    this.setState({
      signChoosed: true,
    });
  };

  handleSubmit = (event) => {
    if (this.state.signChoosed) {
      this.props.startGame(true);
    } else {
/*      this.setState(currentState => ({
        activatePopup: currentState.activatePopup = true,
      }), () => {
        this.setState({
          activatePopup: false,
        });
      });*/
    }
    event.preventDefault();
  };

  render() {
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
          {[<b>X</b>, ' - always go first']}
        </h4>
        <button
          type="submit"
          className="start-button"
        >
          {'Start new game'}
        </button>

      </form>
    );
  }
}
