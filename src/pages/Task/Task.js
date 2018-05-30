import { updateTask, getTask, createTask } from 'services/tasksService';

export class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      day: props.location.search.replace(/\D+/, '')
    };
  }

  componentDidMount() {
    const { task } = this.props.match.params;

    if (task !== 'new') {
      getTask(task)
        .then(task => this.setState(Object.assign({}, task)));
    }
  }

  updateTask = (event) => {
    const { task } = this.props.match.params;
    let promise;

    if (task !== 'new') {
      promise = updateTask(task, this.state);
    } else {
      promise = createTask(this.state);
    }

    // after succec response redirect to tasks page
    promise.then(() => this.props.history.push('/tasks'));

    event.preventDefault();
  };

  onChange = (event) => {
    const { target } = event;

    this.setState({ [target.name]: target.value });
  };

  render() {
    const { title, description } = this.state;

    return (
      <form
        onSubmit={this.updateTask}
      >
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onChange}
          placeholder="Enter a title"
        />
        <br />
        <br />
        <textarea
          name="description"
          cols="30"
          rows="10"
          value={description}
          onChange={this.onChange}
        />

        <br />
        <br />
        <input
          type="submit"
          value="Save"
        />
      </form>
    );
  }
}
