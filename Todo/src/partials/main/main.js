import React, { Component } from 'react';
import { connect } from 'react-redux';

import './main.scss';

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    /*    this.state = {
          openModal: false
        }; */
  }

  componentDidMount() {
    /*    getTasksInfo()
          .then(this.props.setInfo); */
    /*    getCounter()
          .then(this.props.addGame); */
  }

  /*  updateModal(isOpen) {
      this.setState({ openModal: isOpen });
    } */

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

        {/*        <ReactModal
          isOpen={this.state.openModal}
          contentLabel="Minimal Modal Example"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          shouldReturnFocusAfterClose={true}
          ariaHideApp={false}
        >
          <p>Hello</p>
          <button onClick={() => this.updateModal(false)}>Close</button>
        </ReactModal> */}

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
