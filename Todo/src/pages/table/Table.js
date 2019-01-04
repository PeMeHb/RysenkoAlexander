import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from "../../services/userService";
import { setAllUsers } from '../../store';


import './table.scss';

export class TableResult extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    getUsers()
      .then(this.props.setAllUsers);
  }

  allUsers = () => {
    const { getUsers } = this.props;
/*    users.forEach((user) => {
      delete user.sid;
      delete user.password;
      console.log(user)
    });*/
  };


  render() {
    const { user, getUsers } = this.props;

    this.allUsers();

    console.log(getUsers);

    return (

      user
      && (
        <React.Fragment>

          {/*        <article>
          <p>{['You have finished ', <strong>{user['X'].gameCounter + user['0'].gameCounter}</strong>, ' total games']}</p>
          <p>{['Total win games: ', <strong>{user['X'].winGames + user['0'].winGames}</strong>]}</p>
          <p>{['Total lose games: ', <strong>{user['X'].loseGames + user['0'].loseGames}</strong>]}</p>
          <p>{['Total draw games: ', <strong>{user['X'].drawGames + user['0'].drawGames}</strong>]}</p>
        </article>*/}

        </React.Fragment>
      )
    );
  }
}


const mapState = ({ user, getUsers }) => ({
  user,
  getUsers
});

const mapDispatch = {
  setAllUsers
};

export const Table = connect(mapState, mapDispatch)(TableResult);
