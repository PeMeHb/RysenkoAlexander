import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Header } from './partials/header';
import { Pages } from './pages';
import { checkUser } from './services/userService';
import { setUser } from './store';

import './app.scss';

export class AppComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    checkUser()
      .then(this.setLoginState)
      .catch(() => this.setLoginState(false));
  }

  setLoginState = (user) => {
    this.props.setUser(user);
  };

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Header
          user={user}
          setLoginState={this.setLoginState}
        />
        <main className="main">
          {
            user !== null ?
              <Pages
                user={user}
                setLoginState={this.setLoginState}
              /> : <div>Loading...</div>
          }
        </main>
      </React.Fragment>
    );
  }
}

const mapState = ({ user }) => ({
  user
});

const mapDispatch = {
  setUser
};

export const App = withRouter(connect(mapState, mapDispatch)(AppComponent));
