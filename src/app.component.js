import React from 'react';

import { Header } from './partial/header';
import { Main } from './partial/main';
import { Footer } from './partial/footer';

import './app.scss';

export const App = (
  <div className="container">
    <Header />
    <Main />
    <Footer />
  </div>
);
