import './form.scss';

export class Form2 extends Component {
  constructor(props) {
    super(props);

    this.fields = [
      { label: 'email', reg: /^\w+@\w+\.[a-z]{2,}$/ },
      { label: 'name', reg: /^[^ ]{3,20}$/ },
      { label: 'surname', reg: /^[^ ]{3,20}$/ },
      { label: 'password', reg: /^[^ ]{6,20}$/, secure: true },
      { label: 'repeat password', reg: /^[^ ]{6,20}$/, secure: true }
    ];

    this.state = {};
    this.fields.forEach(field => this.state[field.label] = { value: '' });
  }

  handleField = (event) => {
    const target = event.target;
    this.setState({ [target.name]: { value: target.value } });
  };

  setFieldState(e, index) {
    const field = this.fields[index];
    const { name, value } = e.target;
    const stateField = this.state[name];

    if (name.includes('password') && !stateField.error) {
      const fields = this.fields.filter(field => field.label.includes('password'));
      const names = fields.map(field => field.label);
      let error = '';

      if (/* this.getValidState(fields) && */ this.state[names[0]].value !== this.state[names[1]].value) {
        error = 'Not equal!';
      }

      this.setState({
        [names[0]]: Object.assign({}, this.state[names[0]], { error }),
        [names[1]]: Object.assign({}, this.state[names[1]], { error })
      });
      return;
    }

    if (!field.reg.test(value)) {
      stateField.error = `${field.label} is wrong!`;
    } else {
      stateField.error = '';
    }

    this.setState({ [name]: stateField });
  }

  saveUser = (e) => {
    const data = {};
    for (let key in this.state) {
      data[key] = this.state[key].value;
    }
    console.log(data);
    e.preventDefault();
  }

  getValidClass(error) {
    if (error) {
      return 'error';
    }

    if (error === '') {
      return 'correct';
    }

    return '';
  }

  getDisabledState() {
    for (let key in this.state) {
      if (this.state[key].error || this.state[key].error === undefined) {
        return true;
      }
    }

    return false;
  }

  render() {
    const { state, fields } = this;

    return (
      <form
        className="user"
        onSubmit={this.saveUser}
      >
        <ul>
          {fields.map((field, index) => (
            <li key={field.label}>
              <input
                type={field.secure ? 'password' : 'text'}
                name={field.label}
                className={this.getValidClass(state[field.label].error)}
                placeholder={field.label.toUpperCase()}
                value={state[field.label].value}
                onChange={this.handleField}
                onBlur={e => this.setFieldState(e, index)}
              />
              {state[field.label].error && <span>{state[field.label].error}</span>}
            </li>))}
        </ul>

        <input
          type="submit"
          value="Save"
          disabled={this.getDisabledState()}
        />
      </form>
    );
  }
}
