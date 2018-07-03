import React from 'react';

import { getCounter } from "../../services/gameService";
import {TaskList} from "../TaskList/TaskList";

import './playGround.scss';



export class PlayGround extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
    };
  }

  addSign = () => {
    this.setState({
      value: 'X',
    })
  };

  onClick = (event) => {
    const { target } = event;
    console.log(target.value);
    this.setState({ [target.name]: target.value });
  };


  componentDidMount() {

  }

  render() {

    const field = new Array(9).fill(null);
/*    console.log(field);*/

    const { user, gameCounter } = this.props;

    return (
        <div className="playGround">

          <ul className="ground"> {

            this.state.squares.map((box, boxIndex) => (
                <li
                    key={boxIndex}
                    id={boxIndex}
                    className="cell"
                    onClick={(target) => this.onClick(target)}
                >
                  {this.state.value}
                </li>
            ))}
          </ul>
        </div>

    );
  }
}
