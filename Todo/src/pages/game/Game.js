import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import {updateCount, getCounter} from '../../services/userService';
import {addInfo} from '../../store';
import {ChooseSign} from '../../pages/chooseSign';
import {PlayGround} from '../../pages/playGround'

import './game.scss';
import {Pages} from "../Pages";
import {checkUser, update} from "../../services/userService";

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
      playerSign: dataFromChild === "X" ? "X" : "O",
      computerSign: dataFromChild === "X" ? "O" : "X",
    });
  //  console.log(this.state.playerSign);
  };

  startGame = (dataFromChild) => {
  //  console.log(dataFromChild);

  //  let nextState = Object.assign({}, this.state, { startGame: dataFromChild });

/*    this.setState((state, props) => {
      console.log(state ,props.startGame);
      return {startGame: state.startGame === props.startGame};
    });*/

 /*   this.setState(prevState => ({
      startGame: prevState.startGame === dataFromChild
    }));*/

    this.setState({startGame: dataFromChild});

//  console.log(this.state.startGame);
};

  componentDidMount() {
    getCounter()
        .then(this.props.addInfo);
  }

  changeCounter = (counter) => {
/*    updateCount(counter)
        .then(this.props.addInfo(counter));*/
  };

  render() {
    const { user } = this.props,
          { playerSign, computerSign, startGame } = this.state;

    return (
        user &&
        <section className="section">
          <h1 className="section__title">{user.firstName}</h1>
            <article>
              <p>You have finished <strong>{user['X'].gameCounter + user['0'].gameCounter}</strong> total games</p>
              <p>Total win games: <strong>{user['X'].winGames + user['0'].winGames}</strong></p>
              <p>Total lose games: <strong>{user['X'].loseGames + user['0'].loseGames}</strong></p>
              <p>Total draw games: <strong>{user['X'].drawGames + user['0'].drawGames}</strong></p>
            </article>
          <ChooseSign playerSign={this.chooseSign} startGame={this.startGame}/>
          <PlayGround
              user={user}
              playerSign={playerSign}
              computerSign={computerSign}
              startGame={startGame}
              changeCounter={this.changeCounter}
          />
        </section>

    );
  }
}

const mapState = ({ user }) => ({
  user,
});

const mapDispatch = {
  addInfo
};

export const Game = connect(mapState, mapDispatch)(GameMod);


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
