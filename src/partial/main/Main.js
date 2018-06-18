import { Switch, Route } from 'react-router-dom';

import { Roster } from '../roster';
import { Home } from '../home';
import { Buttons } from '../button';


import './main.scss';

export const Main = props => (
  <main className="main">
    <div className="main__wrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/roster" component={Roster} />
      </Switch>
      <Buttons update={props.dispatch} />
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

