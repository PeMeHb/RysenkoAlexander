import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './playerSign.scss';

export class ChooseSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signChoosed: false,
      showPopup: ""
    };
  }

  handleClick = (event) => {
    this.props.playerSign(event.target.value);
    this.setState({
      signChoosed: true,
    });

  };

  handleSubmit = (event) => {
    console.log(this.state.signChoosed);
    if (this.state.signChoosed) {
      this.props.startGame(true);
    } else {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = "popup-appear-active",
      }), () => this.hidePopup());
    }
    event.preventDefault();
  };

  hidePopup = () => {
    setTimeout(() => {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = ""
      }))
    }, 2000)
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

          <ReactCSSTransitionGroup
              component="div"
              transitionName="popup"
              className={`sign-popup ${this.state.showPopup}`}
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
          >
              <p className="sign-text">You need to pick your sign first</p>
          </ReactCSSTransitionGroup>

        </form>
    );
  }
}


/*        <div className={`sign-popup ${this.state.showPopup}`}>
              <p className="sign-text">You need to pick your sign first</p>
            </div>*/


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



