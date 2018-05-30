import { Navigation } from 'partial/navigation';

import './header.scss';


export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <a href="/" className="header__logo">
            <img src="#" alt="Logo" />
          </a>
          <Navigation islogin />
        </div>
      </header>
    );
  }
}

export class Counter extends React.Component {
  constructor() {
    super();
    this.state = { counter: 0 };
  }

  clickHendler = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div className="counter">
        <button onClick={this.clickHendler}>Inc</button>
        <span>{this.state.counter}</span>
      </div>
    );
  }
}
