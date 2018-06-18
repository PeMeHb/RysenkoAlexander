import { Navigation } from 'partial/navigation';

import './header.scss';


export const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <a href="/" className="header__logo">
        <img src="#" alt="Logo" />
      </a>
      <Navigation islogin />
    </div>
  </header>
);
