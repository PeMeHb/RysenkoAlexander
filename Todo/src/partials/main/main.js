import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popup } from '../../pages/modal';

import './main.scss';

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activatePopup: false
    };
  }

  componentDidMount() {
    /*    getTasksInfo()
          .then(this.props.setInfo); */
    /*    getCounter()
          .then(this.props.addGame); */
  }

/*    updateModal(isOpen) {
      this.setState({ openModal: isOpen });
    }*/

  onOpenModal = () => {
    this.setState(currentState => ({
      activatePopup: currentState.activatePopup = true,
    }), () => {
      this.setState({
        activatePopup: false,
      });
    });
  };



  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <h1 className="main-title">
          {['Hello ', user.firstName]}
        </h1>
        {
          user
          && (
            <article>
              <p>{['You have finished ', <strong key={"01"}>{user['X'].gameCounter + user['0'].gameCounter}</strong>, ' total games']}</p>
              <p>{['Total win games: ', <strong key={"02"}>{user['X'].winGames + user['0'].winGames}</strong>]}</p>
              <p>{['Total lose games: ', <strong key={"03"}>{user['X'].loseGames + user['0'].loseGames}</strong>]}</p>
              <p>{['Total draw games: ', <strong key={"04"}>{user['X'].drawGames + user['0'].drawGames}</strong>]}</p>
            </article>
          )
        }
        <button
          onClick={this.onOpenModal}
        >
          {['Hello']}
        </button>

        <Popup activatePopup={this.state.activatePopup} text={['You need to pick your sign first ',<b key={"001"}>X</b>,' or ',<b key={"002"}>O</b>]} />

      </React.Fragment>
    );
  }
}


const mapState = ({ user }) => ({
  user,
});

const mapDispatch = {
  // addInfo
};

export const Main = connect(mapState, mapDispatch)(MainComponent);
