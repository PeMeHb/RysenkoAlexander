import React, { Component } from 'react';
import { connect } from "react-redux";

import {getCounter, update} from '../../services/userService';
import { addInfo } from '../../store';

import './table.scss';

export const TableResult = (props) => {
  const { user } = props;

  return (

      <React.Fragment>


        <article>
          <p>You have finished <strong>{user['X'].gameCounter + user['0'].gameCounter}</strong> total games</p>
          <p>Total win games: <strong>{user['X'].winGames + user['0'].winGames}</strong></p>
          <p>Total lose games: <strong>{user['X'].loseGames + user['0'].loseGames}</strong></p>
          <p>Total draw games: <strong>{user['X'].drawGames + user['0'].drawGames}</strong></p>
        </article>

      </React.Fragment>
  );
};

const mapState = ({ user }) => ({
  user,
});

const mapDispatch = {
  addInfo
};


export const Table = connect(mapState, mapDispatch)(TableResult);

