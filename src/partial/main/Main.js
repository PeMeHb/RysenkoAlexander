import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Roster } from '../roster';
import { Home } from '../home';
import { Year } from '../year';
import { Todo } from '../todo';

import './main.scss';


export const Main = () => (
  <main className="main">
    <div className="main__wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/roster" component={Roster} />
        <Route path="/year" component={Year} />
        <Route path="/todo" component={Todo} />
      </Switch>
    </div>
  </main>
);


/*

export class Main extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <main className="main">
        <div className="main__wrapper" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/roster" component={Roster} />
          <Route path="/schedule" component={Schedule} />
        </Switch>
      </main>
    );
  }
}
*/

