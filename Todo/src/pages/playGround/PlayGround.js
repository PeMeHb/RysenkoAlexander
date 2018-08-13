import React from 'react';

import {getCounter} from "../../services/gameService";
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

    console.log(isComputer);

    if (isComputer) return;
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.computer();
  };

  computer = () => {

    const {squares, isComputer} = this.state;

    console.log(isComputer);

    this.computerIQ();


  };

  randomCorner = () => {

    const squares = this.state.squares.slice(),
      corners = [0, 2, 6, 8];

    let randomCorner = Math.floor(Math.random() * corners.length);

    console.log(squares[corners[randomCorner]]);

    squares[corners[randomCorner]] ? this.randomCorner() : squares[corners[randomCorner]] = "O";

    this.setSquares(squares);

    /*    if (!squares[corners[randomCorner]]) {

        }
        squares[corners[randomCorner]] = "O";*/

  };


  computerIQ = () => {
    const squares = this.state.squares.slice(),
      length = squares.length,
      middle = (length - 1) / 2,
      compSign = "O",
      lines = [
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
        console.log("1", squares);

        squares[c] = "O";
        this.setSquares(squares);
        return;
      }
      if (squares[a] && squares[a] === squares[c] && !squares[b]) {
        console.log("2", squares);

        squares[b] = "O";
        this.setSquares(squares);
        return;
      }
      if (squares[b] && squares[b] === squares[c] && !squares[a]) {
        console.log("3", squares);

        squares[a] = "O";
        this.setSquares(squares);
        return;
      }

    }

    if (!squares[middle]) {
      squares[middle] = compSign;
      this.setSquares(squares);
      return;
    }

    if (!squares[0] || !squares[2] || !squares[6] || !squares[8]) {
      const corners = [0, 2, 6, 8];
      let randomCorner = Math.floor(Math.random() * corners.length);

      console.log(squares[corners[randomCorner]]);

      squares[corners[randomCorner]] ? this.randomCorner() : squares[corners[randomCorner]] = "O";

      this.setSquares(squares);

    }


  };

  playAgain = () => {
    this.setState({
      squares: Array(9).fill(null),
      isComputer: false,
    });
  };

  setSquares = (squares) => {
    this.setState({
      squares: squares,
      isComputer: this.state.isComputer = !this.state.isComputer
    });
  };

  componentDidMount() {

  }


  render() {

    const {squares} = this.state;

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

        <button className="butt" onClick={this.playAgain}>Play again</button>
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

/*  const fl = (field) => this.setState(Object.assign({}, field)); */
