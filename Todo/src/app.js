import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './app.component';
import { store } from './store';

const Root = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDom.render(Root, document.getElementById('app'));
