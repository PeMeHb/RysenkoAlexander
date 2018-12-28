import React, {Component} from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import { getTasksInfo } from '../../services/tasksService';
import { getCounter } from '../../services/userService';
import { setInfo, addGame } from '../../store';

import './main.scss';

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  componentDidMount() {
    getTasksInfo()
      .then(this.props.setInfo);
    getCounter()
        .then(this.props.addGame);
  }

  updateModal(isOpen) {
    this.setState({ openModal: isOpen });
  }

  render() {
    const { user, info } = this.props;
    console.log(user.X.gameCounter);
    return (
      <React.Fragment>
        <h1>Hello, {user.firstName}</h1>

        {
          info &&
          <article>
            <p>You have finished <strong>{user['X'].gameCounter + user['0'].gameCounter}</strong> total games</p>
            <p>Done: <strong>{info.done}</strong></p>
            <p>In progress: <strong>{info.inProgress}</strong></p>
            <p>Waiting: <strong>{info.waiting}</strong></p>
          </article>
        }

        <ReactModal
          isOpen={this.state.openModal}
          contentLabel="Minimal Modal Example"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          shouldReturnFocusAfterClose={true}
          ariaHideApp={false}
        >
          <p>Hello</p>
          <button onClick={() => this.updateModal(false)}>Close</button>
        </ReactModal>

      </React.Fragment>
    );
  }
}


const mapState = ({ user, info, gameCounter }) => ({
  user,
  info,
  gameCounter
});

const mapDispatch = {
  setInfo,
  addGame
};

export const Main = connect(mapState, mapDispatch)(MainComponent);
