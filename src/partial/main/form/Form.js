import './form.scss';

const roles = ['admin', 'quest', 'user'];

export class Form extends Component {
  constructor(props) {
    super(props);
    this.fields = [
      { label: 'email', reg: /^\w+@\w+\.[a-z]{2,}$/ },
      { label: 'name', reg: /^[^ ]{3,20}$/ },
      { label: 'surname', reg: /^[^ ]{3,20}$/ },
      { label: 'password', reg: /^[^ ]{6,20}$/ }
    ];
    /*    this.state = {
          name: '',
          email: '',
          role: '',
          box: true
        }; */

    this.state = {};
    this.fields.forEach(field => this.state[field.label] = '');
  }

  handleField = (event) => {
    const target = event.target;

    if (target.name === 'box') {
      console.log(this.state.box);
      this.setState({ [target.name]: target.checked });
      return;
    }

    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <form>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleField}
          required
          pattern="\D"
        />

        {/* <input
          name="email"
          value={this.state.email}
          onChange={this.handleField}
        />
        <p>{this.state.name.toUpperCase()}</p>

        <select
          name="role"
          value={this.state.role}
          onChange={this.handleField}
        >

          {roles.map(role => <option value={role}>{role.toUpperCase()}</option>)}

        </select>
        <mark>{this.state.role}</mark>
*/}
        <input
          type="submit"
          value="Create"
        />
      </form>
    );
  }
}
