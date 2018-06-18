import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './home.scss';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: ''
    };
  }

  add = () => {
    const arr = this.state.data.slice();
    arr.push({ id: (new Date()).getTime(), name: this.state.name });
    this.setState({ data: arr });
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div>
                Enter Name <input onChange={this.handleChange} type="text" />
        <input
          onClick={this.add}
          type="button"
          value="Add"
        />
        <ul>
          <ReactCSSTransitionGroup
            transitionName="anim"
            transitionAppear={false}
            transitionEnterTimeout={500}
            transitionEnter
            transitionLeave={false}
          >
            {
                            this.state.data.map(player => <li key={player.id}>{player.name}</li>)
                        }
          </ReactCSSTransitionGroup>
        </ul>

      </div>
    );
  }
}


/*

const testList = () => (
  <div>
    <ul>
      {
                PlayerAPI.all().map(p => (
                  <li key={p.number}>
                    <Link to={`/roster/${p.number}`}>{p.name}</Link>
                  </li>
                ))
            }
    </ul>
  </div>
);

export const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
    <div>{testList}</div>
  </div>
);

*/
