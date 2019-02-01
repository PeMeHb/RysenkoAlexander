import React, { Component } from 'react';

import { connect } from 'react-redux';

import { update } from '../../services/userService';
import { setUser } from '../../store';
import { ChooseSign } from '../chooseSign';
import { PlayGround } from '../playGround';

import './game.scss';

export class GameMod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerSign: null,
      computerSign: null,
      startGame: null,
    };

    //  console.log(this.props);
  }

  chooseSign = (dataFromChild) => {
    this.setState({
      playerSign: dataFromChild === 'X' ? 'X' : 'O',
      computerSign: dataFromChild === 'X' ? 'O' : 'X',
    });
    //  console.log(this.state.playerSign);
  };

  startGame = (dataFromChild) => {
    //  console.log(dataFromChild);

    //  let nextState = Object.assign({}, this.state, { startGame: dataFromChild });

    /*    this.setState((state, props) => {
          console.log(state ,props.startGame);
          return {startGame: state.startGame === props.startGame};
        }); */

    /*   this.setState(prevState => ({
         startGame: prevState.startGame === dataFromChild
       })); */

    this.setState({ startGame: dataFromChild });
  };

  componentDidMount() {

/*    getCounter()
      .then(this.props.addInfo);*/
  }

  changeCounter = (counter) => {
        update(counter)
            .then(this.props.setUser(counter));
  };

  render() {
    const { user } = this.props,
      { playerSign, computerSign, startGame } = this.state;

    return (
      user
      && (
        <section className="section">
          <h1 className="section__title">{user.firstName}</h1>
          <article>
            <p>You have finished <strong>{user.X.gameCounter + user.O.gameCounter}</strong> total games</p>
            <p>Total win games: <strong>{user.X.winGames + user.O.winGames}</strong></p>
            <p>Total lose games: <strong>{user.X.loseGames + user.O.loseGames}</strong></p>
            <p>Total draw games: <strong>{user.X.drawGames + user.O.drawGames}</strong></p>
          </article>
          <ChooseSign playerSign={this.chooseSign} startGame={this.startGame} />
          <PlayGround
            user={user}
            playerSign={playerSign}
            computerSign={computerSign}
            startGame={startGame}
            changeCounter={this.changeCounter}
          />
        </section>
      )
    );
  }
}

const mapState = ({ user }) => ({
  user,
});

const mapDispatch = {
  setUser
};

export const Game = connect(mapState, mapDispatch)(GameMod);
