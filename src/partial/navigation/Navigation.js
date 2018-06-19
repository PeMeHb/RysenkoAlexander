import { NavLink } from 'react-router-dom';
import './navigation.scss';

export const Navigation = ({ islogin }) => (
  <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item"><NavLink to="/" className="header__nav-link">Home</NavLink></li>
      <li className="header__nav-item"><NavLink to="/roster" className="header__nav-link">Roster</NavLink></li>
      <li className="header__nav-item"><NavLink to="/year" className="header__nav-link">Year</NavLink></li>
    </ul>
  </nav>
);
