import './form.scss';

export class Form extends Component {
  constructor(props) {
    super(props);

    this.fields = [
      { label: 'email', reg: /^\w+@\w+\.[a-z]{2,}$/ },
      { label: 'firstName', reg: /^[^ ]{3,20}$/ },
      { label: 'lastName', reg: /^[^ ]{3,20}$/ },
      { label: 'password', reg: /^[^ ]{6,20}$/, secure: true },
      { label: 'repeat password', reg: /^[^ ]{6,20}$/, secure: true }
    ];

    const { data } = this.props;

    this.state = {};
    this.fields.forEach(field => this.state[field.label] = { value: data && data[field.label] || '' });
  }

  handleField = (event) => {
    const { target } = event;
    this.setState({ [target.name]: { value: target.value } });
  }

  setFieldState(e, index) {
    const field = this.fields[index];
    const { name, value } = e.target;
    const stateField = this.state[name];
    const isRepeatPasswordShown = !this.props.exclude.includes('repeat password');

    if (isRepeatPasswordShown && name.includes('password') && !stateField.error) {
      const fields = this.fields.filter(field => field.label.includes('password'));
      const names = fields.map(field => field.label);
      let error = '';

      if (this.state[names[0]].value !== this.state[names[1]].value) {
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

    this.fields
      .filter(this.filterExcluded)
      .forEach((field) => {
        if (!field.label.includes('repeat')) {
          data[field.label] = this.state[field.label].value;
        }
      });

    this.props.submit(data);
    e.preventDefault();
  }

  static getValidClass(error) {
    if (error) {
      return 'error';
    }

    if (error === '') {
      return 'correct';
    }

    return '';
  }

  getDisabledState() {
    return this.fields
      .filter(this.filterExcluded)
      .filter(this.filterDisabled)
      .some((field) => {
        const { error, value } = this.state[field.label];

        if (error || error === undefined && !value) {
          return true;
        }

        return false;
      });
  }

  filterExcluded = field => !this.props.exclude.find(name => field.label === name);

  filterDisabled = field => !this.props.disabled.find(name => field.label === name);

  render() {
    const { state, fields, props } = this;
    const { disabled } = props;

    return (
      <form
        className="form"
        onSubmit={this.saveUser}
      >
        <ul>
          {fields
            .filter(this.filterExcluded)
            .map((field, index) => (
              <li key={field.label}>
                <input
                  type={field.secure ? 'password' : 'text'}
                  name={field.label}
                  className={Form.getValidClass(state[field.label].error)}
                  placeholder={field.label.toUpperCase()}
                  value={state[field.label].value}
                  disabled={disabled.includes(field.label)}
                  onChange={this.handleField}
                  onBlur={e => this.setFieldState(e, index)}
                />
                {state[field.label].error && <span>{state[field.label].error}</span>}
              </li>))
          }
        </ul>

        <input
          type="submit"
          value="Ok"
          disabled={this.getDisabledState()}
        />
      </form>
    );
  }
}

Form.defaultProps = {
  exclude: [],
  disabled: [],
  submit: _ => _
};
