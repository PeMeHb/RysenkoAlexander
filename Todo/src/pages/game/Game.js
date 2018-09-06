import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import {createCount, updateCount, getCounter} from '../../services/gameService';
import {addGame} from '../../store';
import {ChooseSign} from '../../pages/chooseSign';
import {PlayGround} from '../../pages/playGround'

import './game.scss';

export class GameMod extends Component {
  constructor() {
    super();
    this.state = {
      playerSign: null,
      computerSign: null,
      startGame: null,
    };
  }

  chooseSign = (dataFromChild) => {
    this.setState({
      playerSign: dataFromChild === "X" ? "X" : "O",
      computerSign: dataFromChild === "X" ? "O" : "X",
    });
  };

  startGame = (dataFromChild) => {
    this.setState({
      startGame: dataFromChild
    });
  };

  componentDidMount() {
    getCounter()
        .then(this.props.addGame);
  }

  render() {
    const { user, gameCounter } = this.props,
          { playerSign, computerSign, startGame } = this.state;

    return (
        gameCounter &&
        <section className="section">
          <h1 className="section__title">{user.firstName}</h1>
          <h2 className="section__title">{gameCounter.counter}</h2>
          <ChooseSign playerSign={this.chooseSign} startGame={this.startGame}/>
          <PlayGround user={user} gameCounter={gameCounter} playerSign={playerSign} computerSign={computerSign} startGame={startGame}/>
        </section>

    );
  }
}

const mapState = ({user, gameCounter}) => ({
  user,
  gameCounter
});

const mapDispatch = {
  addGame
};

export const Game = withRouter(connect(mapState, mapDispatch)(GameMod));


/*



export class Game extends Component {
  constructor() {
    super();
    this.state = {
      classActive: true,
      buttonClass: "",
      buttonText: "Show",
      latitude: "",
      longitude: "",
      users: [],
      posts: [],
    };
  }

  toggleClass = () => {
    this.setState({
      classActive: !this.state.classActive,
      buttonClass: this.state.classActive ? "active" : "",
      buttonText: this.state.classActive ? "Hide" : "Show",
    });
  };

  showLocate = () => {
    navigator.geolocation.getCurrentPosition( (pos) => {
      this.setState({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  };

  getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState( {users} ));
  };

  userPost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => response.json())
        .then(posts => this.setState( {posts} ));
  };

  render() {

    const {buttonClass, buttonText, latitude, longitude, users, posts} = this.state;

    return (
        <section className="section">
          <h2 className="section__title">{mainTitleText}</h2>

{/!*          <Button
              className={buttonClass}
              clickHendler={this.toggleClass}
              buttonText={buttonText}
          />
          <Locate
              clickHendler={this.showLocate}
              latitude={latitude}
              longitude={longitude}
          />
          <Users
              users={users}
              clickHendler={this.getUsers}
              postHendler={this.userPost}
              posts={posts}
          />*!/}

        </section>
    )
  }
}
*/
