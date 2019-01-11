import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { CSSTransitionGroup } from 'react-transition-group'
import Modal from 'react-responsive-modal';

import styles from './main.scss';

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
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
              <p>{['You have finished ', <strong>{user['X'].gameCounter + user['0'].gameCounter}</strong>, ' total games']}</p>
              <p>{['Total win games: ', <strong>{user['X'].winGames + user['0'].winGames}</strong>]}</p>
              <p>{['Total lose games: ', <strong>{user['X'].loseGames + user['0'].loseGames}</strong>]}</p>
              <p>{['Total draw games: ', <strong>{user['X'].drawGames + user['0'].drawGames}</strong>]}</p>
            </article>
          )
        }
        <button
          onClick={this.onOpenModal}
        >
          {['Hello']}
        </button>

        <Modal
          open={this.state.open}
          onClose={this.onCloseModal}
          center
        >
          <h2>Hello</h2>
        </Modal>

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
