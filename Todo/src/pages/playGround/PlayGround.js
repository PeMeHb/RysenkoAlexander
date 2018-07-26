import React from 'react';

import { getCounter } from "../../services/gameService";
import {TaskList} from "../TaskList/TaskList";

import './playGround.scss';


export class PlayGround extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      isComputer: false,
    };
  }

  /* const squares = Object.assign({}, this.state.squares); */

/*  handleField = (event) => {
    const target = event.target;
    this.setState({ [target.name]: { value: target.value } });
    console.log(target.text);
  }; */

  /*   this.setState({
       squares: squares,
       isComputer: !this.state.isComputer,
     }); */

  onClick = (event) => {
    const {squares, isComputer} = this.state,
        playerSign = "X";

/*    console.log(isComputer); */

    if (isComputer) return;
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.computer();
  };

  computer = () => {

/*  const fl = (field) => this.setState(Object.assign({}, field)); */

    const { squares } = this.state,
        length = squares.length,
        middle = (length - 1) / 2,
        compSign = "O";

    this.calculateWinner(squares);


    if (!squares[middle]) {
      squares[middle] = compSign;
      this.setSquares(squares)
    }

  };



  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // console.log([a, b, c] = lines[i]);
      // console.log(squares[a], squares[b], squares[c], i, lines.length );
      // console.log(squares[i]);
      //  if (squares[a] === squares[b] || squares[a] === squares[c] || squares[b] === squares[c]) {
      //    console.log("a = b" + squares[a] === squares[b] + '\n' + "a = c" + squares[a] === squares[c]);
      //
      //  }
      if (squares[a] && squares[a] === squares[b] && !squares[c]) {
        console.log("1");
        squares[c] = "O";
      }
      if (squares[a] && squares[a] === squares[c] && !squares[b]) {
        console.log("2");
        squares[b] = "O";
      }
      if (squares[b] && squares[b] === squares[c] && !squares[a]) {
        console.log("3");
        squares[a] = "O";
      }

    }

  };


  setSquares = (squares) => {
    this.setState({
      squares: squares,
      isComputer: this.state.isComputer ? false : this.state.isComputer,
    });
  };

  componentDidMount() {

  }


  render() {

    const { squares } = this.state;

/*    const { user, gameCounter } = this.props;*/

    return (
        <div className="playGround">
          <ul className="ground"> {
            squares.map((box, boxIndex) => (
                <li
                    key={boxIndex}
                    id={boxIndex}
                    className="cell"
                    onClick={this.onClick}
                >
                  {box}
                </li>
            ))}
          </ul>
        </div>

    );
  }
}


/*
    for (let i = 0; i < lines.length; i++) {
      console.log(lines[i]);
      console.log(squares);

    switch (lines[i]) {

      case [0, 1, 2]:

        console.log("0 - line");
        break;

      case [0, 3, 6]:
        console.log("3 - line");
        break;
    }

    }
*/


/*    if (!this.state.isComputer) return; */

/*    for (let i = 0; i < length; i++) {
      console.log(squares[i]);
    }*/

/*    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a]);
        return squares[a];
      }
    }*/