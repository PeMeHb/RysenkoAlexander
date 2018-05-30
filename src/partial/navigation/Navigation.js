import './navigation.scss';

export const Navigation = ({ islogin }) => (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <a className="header__nav-link">Home</a>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link">Login</a>
        </li>
      </ul>
    </nav>
);

