import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './popup.scss';

export class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: "",
    };
  }

  componentDidUpdate(prevProps) {
    const {activatePopup} = this.props;
    if (prevProps.activatePopup !== activatePopup) {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = "popup-appear-active",
      }), () => this.hidePopup() );
    }
  }

  hidePopup = () => {
    const {delay} = this.props;
    setTimeout(() => {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = "",
      }))
    }, delay)
  };

  render() {
    return (
          <ReactCSSTransitionGroup
              component="div"
              transitionName="popup"
              className={`sign-popup ${this.state.showPopup}`}
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
          >
              <div className="inner-popup"><p className="popup-text">{this.props.text}</p></div>
          </ReactCSSTransitionGroup>
    );
  }
}


/*  openPopup() {
    console.log(this.props.activatePopup);
    const {switchPopup} = this.state;
    if (switchPopup) {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = "popup-appear-active",
      }), () => this.hidePopup() );
    }
  }*/
