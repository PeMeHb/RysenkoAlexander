import { connect } from 'react-redux';

import { Buttons } from './Buttons';
import { InfoYear } from './InfoYear';
import { AddTodo } from './AddTodo';
import { ListTodo } from './ListTodo';

export const AppComponent = (props) => (
  <React.Fragment>
    <Buttons update={props.dispatch}/>
    <InfoYear date={props.date}/>
    <AddTodo update={props.dispatch}/>
    <ListTodo todo={props.todo}/>
  </React.Fragment>
);

const mapStateToProps = state => ({
  todo: state.todo,
  date: state.date
});

export const App = connect(mapStateToProps)(AppComponent);
