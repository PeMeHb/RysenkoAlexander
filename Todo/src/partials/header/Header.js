import { Link } from 'react-router-dom';

import { Navigation } from '../../partials/navigation/index';
import { logout } from '../../services/userService';

import './header.scss';

export const Header = ({ user, setLoginState }) => {
  const onLogout = () => {
    logout()
      .then(() => setLoginState(false))
      /* eslint no-console: ["error", { allow: ["error"] }] */
      .catch(console.error);
  };

  return (
    <header className="header">
      <Link to="/"><img src="../../images/logo.png" className="header-logo" alt="todo" /></Link>
      <Navigation user={user} />
      {
      <button
        className="start-button"
        disabled={!user}
        onClick={onLogout}
      >
        Logout
      </button>
      }
    </header>
  );
};
