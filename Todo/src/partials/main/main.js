import React, { Component } from 'react';
import { connect } from 'react-redux';

import './main.scss';

export class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activatePopup: false
    };
  }


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
              <p>{['You have finished ', <strong key={"01"}>{user.X.gameCounter + user.O.gameCounter}</strong>, ' total games']}</p>
              <p>{['Total win games: ', <strong key={"02"}>{user.X.winGames + user.O.winGames}</strong>]}</p>
              <p>{['Total lose games: ', <strong key={"03"}>{user.X.loseGames + user.O.loseGames}</strong>]}</p>
              <p>{['Total draw games: ', <strong key={"04"}>{user.X.drawGames + user.O.drawGames}</strong>]}</p>
            </article>
          )
        }

      </React.Fragment>
    );
  }
}


const mapState = ({ user }) => ({
  user,
});


export const Main = connect(mapState)(MainComponent);
