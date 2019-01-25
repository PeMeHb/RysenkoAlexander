import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import './modal.scss';


export class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: this.props.activatePopup
    };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    const {activatePopup} = this.props;
    if (prevProps.activatePopup !== activatePopup) {
      this.setState(currentState => ({
        showPopup: currentState.showPopup = true,
      }));
    }
  }

  onOpenModal = () => {
    this.setState({ showPopup: true });
  };

  onCloseModal = () => {
    this.setState({ showPopup: false });
  };


  render() {
    const { text } = this.props;

    return (

   /*   allUsers
      &&*/ (

          <Modal
            open={this.state.showPopup}
            onClose={this.onCloseModal}
            center
            className={"popup-wrapper"}
          >
            <p className="popup-text">{text}</p>
          </Modal>

      )
    );
  }
}
