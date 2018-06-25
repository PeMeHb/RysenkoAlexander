import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tablink, Tab, TabContent } from 'components/Tabs/index';
import { getTasks, updateTask, removeTask } from 'services/tasksService';
import { addTodo, removeTodo } from 'store';

import './tasklist.scss';

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Cб'];

export class TaskListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    getTasks()
      .then(tasks => this.props.addTodo(tasks))
      /* eslint no-console: ["error", { allow: ["log"] }] */
      .catch(console.log);
  }

  removeTask = (indexDay, taskIndex) => {
    const tasks = this.props.tasks[indexDay];
    const task = tasks[taskIndex];

    removeTask(task.id)
      .then(() => {
        this.props.removeTodo({ day: indexDay, index: taskIndex });
      })
      /* eslint no-console: ["error", { allow: ["log"] }] */
      .catch(console.log);
  }

  setTaskState = (task, doneState) => {
    // doneState: undefined | true | false
    task.done = doneState;
    updateTask(task.id, task)
      .then(() => this.setState({ tasks: [...this.state.tasks] }))
      /* eslint no-console: ["error", { allow: ["log"] }] */
      .catch(console.log);
  }

  static getClassName(task) {
    if (task.done) {
      return 'done';
    }

    if (task.done === false) {
      return 'progress';
    }

    return '';
  }

  render() {
    const { tasks } = this.props;

    return (
      <Tabs>

        {
          days.map((day, indexDay) => (
            <Tab key={day}>
              <Tablink title={day} />
              <TabContent>
                <ul className="tasks"> {
                  tasks.length &&
                  tasks[indexDay].map((task, taskIndex) => (
                    <li
                      key={task.id}
                      className={TaskList.getClassName(task)}
                    >
                      <Link to={`/tasks/${task.id}?day=${indexDay}`}>
                        {task.title}
                      </Link>

                      {
                        !task.done &&
                        <React.Fragment>
                          <span onClick={() => this.removeTask(indexDay, taskIndex)}>X</span>
                          <span onClick={() => this.setTaskState(task, true)}>\/</span>
                          <span onClick={() => this.setTaskState(task, false)}>~</span>
                        </React.Fragment>
                      }

                    </li>
                  ))}
                </ul>

                <button onClick={() => this.props.history.push(`/tasks/new?day=${indexDay}`)}>Add New</button>
              </TabContent>
            </Tab>
          ))
        }

      </Tabs>

    );
  }
}

const mapState = ({ tasks }) => ({ tasks });

const mapDispatch = {
  addTodo,
  removeTodo
};

export const TaskList = connect(mapState, mapDispatch)(TaskListComponent);
