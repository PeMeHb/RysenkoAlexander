import React from 'react';
import { connect } from 'react-redux';


import { Header } from './partial/header';
import { Main } from './partial/main';
import { Footer } from './partial/footer';

import './app.scss';

export const AppComponent = () => (
  <div className="container">
    <Header />
    <Main />
    <Footer />
  </div>
);

const mapStateToProps = state => ({
  todo: state.todo,
  date: state.date
});

export const App = connect(mapStateToProps)(AppComponent);
