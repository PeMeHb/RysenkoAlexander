import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { createCount, updateCount, getCount } from '../../services/gameService';
import { addGame } from '../../store';

import './game.scss';


export class GameMod extends Component {
  constructor(props) {
    super(props);
/*    this.state = {
      user2: ''
    }; */
  }



  componentDidMount() {
    const { gameCount } = this.props;
    console.log(gameCount);

/*    getCount(gameCount)
      .then(gameCount => this.setState(Object.assign({}, gameCount)));*/
  }

  render() {
    const { user } = this.props;
    return (
        <section className="section">
          <h2 className="section__title">{user.firstName}</h2>
        </section>

    );
  }
}

const mapState = ({ user, gameCount }) => ({
  user,
  gameCount
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
