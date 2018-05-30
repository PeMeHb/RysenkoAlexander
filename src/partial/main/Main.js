import './main.scss';

import { Counter } from '../header';
import { StatusMessage } from './statusMessage';
import { Persons } from './persons';
import { Form } from './form';
import { Form2 } from './form2';


import { Tabs, Tablink, Tab, TabContent } from './section/tabs';


/* const props = {
    valid: true,
    text: 'Login was success'
}; */

const getProps = (text) => ({
  valid: true,
  text: text || 'Good day'
});

const Comps = {
  List() {
    return (
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    );
  },
  Message(prop) {
    return <mark>{prop.text}</mark>;
  }
};


/* const tabs = [
  { id: 0, title: 'Tab 1', content: 'Some text is here' },
  { id: 1, title: 'Tab 2', content: 'Another content' },
  { id: 2, title: 'Tab 3', content: 'Third text' }
]; */


export class Main extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false
    };
  }

  getUsers = () => {
    this.setState({
      loading: true,
      users: []
    });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ users, loading: false }));
  };

  showAlert = (user) => {
    alert(`${user.email}: ${user.phone}`);
  };


  render() {
    const { users, loading } = this.state;

    return (
      <main className="main">
        <div className="main__wrapper">

          <Counter />

          <Comps.List />
          <Comps.Message text="Test me" />

          <StatusMessage />
          <StatusMessage {...getProps()} />

          <button
            className="button"
            onClick={this.getUsers}
          >
            {'Click'}
          </button>

          <Persons
            users={users}
            clickHendler={this.showAlert}
          />
          {loading && <span>Loading...</span>}

          <Tabs>
            <Tab>
              <Tablink title="link1" />
              <TabContent>
                <h2>I am a tab 1</h2>
                <p>Lorem ipsum dolor.</p>
              </TabContent>
            </Tab>

            <Tab>
              <Tablink title="link2" />
              <TabContent>
                <h2>I am a tab 2</h2>
                <img src="images/google.png" alt="google" />
                <p>Lorem ipsum dolor.</p>
              </TabContent>
            </Tab>
          </Tabs>

          <Form />

          <Form2 />
        </div>
      </main>
    );
  }
}

