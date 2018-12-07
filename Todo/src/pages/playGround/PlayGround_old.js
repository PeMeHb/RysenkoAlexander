import React, {Component} from 'react';

import {Popup} from '../popup';
import {GameMod} from '../game';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCounter, updateCount} from '../../services/gameService';
import {store, addGame} from '../../store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import './playGround.scss';
import {getTasks, updateTask} from "../../services/tasksService";


export class PlayGround extends Component {
  constructor(props) {
    super(props);

    this.mode = 'attack';
    this.cellRefs = [];
    this.getRefs = element => {
      this.cellRefs.push(element);
    };

    this.state = {
      squares: Array(9).fill(null),
      isComputer: false,
      playAgain: true,
      winLine: null,
      activatePopup: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {startGame, computerSign} = this.props;
    if (prevProps.startGame !== startGame && computerSign === "X") {

      /*      console.log("DidUpdate", startGame, computerSign);
            console.log("test", this.state.isComputer);*/

      this.setState(currentState => ({
        isComputer: !currentState.isComputer,
        playAgain: !currentState.playAgain
      }), () => this.computer());

    }
  }


  /*  componentWillReceiveProps(nextProps) {
      const {startGame, computerSign} = this.props;
      if(nextProps.startGame !== startGame && computerSign === "X") {
        console.log("Willrecive", startGame, computerSign, this.state.isComputer);
        this.setState({
          isComputer: this.state.isComputer === true,
        });
        console.log("Willrecive", this.state.isComputer);
        this.computer();
      }
    }*/


  onClick = (event) => {
    const {squares, isComputer} = this.state,
        {playerSign, startGame} = this.props;

    //  console.log(event.target, this.cellRefs);

    /*    console.log(isComputer, this.props.startGame, this.props.computerSign);*/

    if (isComputer || !startGame) return;
    //  this.cellRefs[event.target.id].className += ' signBox-appear-active';
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.computer();
  };


  randomCorner = () => {

    const squares = this.state.squares.slice(),
        corners = [0, 1, 2, 3, 5, 6, 7, 8];

    if (!squares[0] || !squares[1] || !squares[2] || !squares[3] || !squares[5] || !squares[6] || !squares[7] || !squares[8]) {

      console.log("randomCorner");

      let randomCorner = Math.floor(Math.random() * corners.length);

      console.log(corners, squares);

      if (!squares[corners[randomCorner]]) {
        squares[corners[randomCorner]] = this.props.computerSign;
        this.setSquares(squares);
      } else {
        this.randomCorner();
      }
    }

    // !squares[corners[randomCorner]] ? squares[corners[randomCorner]] = this.props.computerSign : this.randomCorner(corners);

  };


  computer = () => {
    const squares = this.state.squares.slice(),
        length = squares.length,
        middle = (length - 1) / 2,
        computerSign = this.props.computerSign,
        playerSign = this.props.playerSign,
        lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ],
        lineLength = lines.length;


    for (let i = 0; i < lineLength; i++) {
      const [a, b, c] = lines[i];

      // console.log([a, b, c] = lines[i]);
      // console.log(squares[a], squares[b], squares[c], i, lines.length );
      // console.log(squares[i]);
      //  if (squares[a] === squares[b] || squares[a] === squares[c] || squares[b] === squares[c]) {
      //    console.log("a = b" + squares[a] === squares[b] + '\n' + "a = c" + squares[a] === squares[c]);
      //
      //  }

    //  let line = lines[i];

/*              console.log(line);
              console.log("a " + a, "b " + b, "c " + c);*/
      /*
            if (squares[a] === computerSign && squares[b] === computerSign && squares[c] === computerSign) {
              console.log('win - comp');
              this.winGame();
            } else if (squares[a] === playerSign && squares[b] === playerSign && squares[c] === playerSign) {
              console.log('win - player');
              this.winGame();
            }*/

/*      this.attack(squares, squares[a], squares[b], squares[c]);
      if (i === lineLength) {
        this.defence(squares, squares[a], squares[b], squares[c]);
      }
      */

console.log(this.mode);

      if (this.mode === 'attack') {

        if (squares[a] === computerSign && squares[b] === computerSign && !squares[c]) {
          squares[c] = computerSign;
          /*          console.log("a = b");
                    console.log("a " + a, "b " + b, "c " + c);
                    console.log(line);*/
          console.log('1 ' + squares[a], squares[b], squares[c]);
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          return;
        }
        if (squares[a] === computerSign && squares[c] === computerSign && !squares[b]) {
          squares[b] = computerSign;
          /*          console.log("a = c");
                    console.log("a " + a, "b " + b, "c " + c);
                    console.log(line);*/
          console.log('2 ' + squares[a], squares[c], squares[b]);
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          return;
        }
        if (squares[b] === computerSign && squares[c] === computerSign && !squares[a]) {
          squares[a] = computerSign;
          /*          console.log("b = c");
                    console.log("a " + a, "b " + b, "c " + c);
                    console.log(line);*/
          console.log('3 ' + squares[b], squares[c], squares[a]);
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          return;
        }
        if (i === lineLength) {
          this.mode = 'defence';
          this.computer();
        }
      }

      if (this.mode === 'defence') {

        if (squares[a] === playerSign && squares[b] === playerSign && !squares[c]) {
          squares[c] = computerSign;
          /*            console.log("1");
                      console.log(line, squares[a], squares[b], squares[c]);*/
          console.log('4 ' + squares[a], squares[b], squares[c]);
          this.setSquares(squares);
          return;
        }
        if (squares[a] === playerSign && squares[c] === playerSign && !squares[b]) {
          squares[b] = computerSign;
          /*            console.log("2");
                      console.log(line, squares[a], squares[b], squares[c]);*/
          console.log('5 ' + squares[a], squares[c], squares[b]);
          this.setSquares(squares);
          return;
        }
        if (squares[b] === playerSign && squares[c] === playerSign && !squares[a]) {
          squares[a] = computerSign;
          /*            console.log("3");
                      console.log(line, squares[a], squares[b], squares[c]);*/
          console.log('6 ' + squares[b], squares[c], squares[a]);
          this.setSquares(squares);
          return;
        }
        if (i === lineLength) {
          this.mode = 'attack';
        }
      }

    }

    if (!squares[middle]) {
      squares[middle] = computerSign;
      this.setSquares(squares);
      return;
    }

    this.randomCorner();


    /*      if (!squares[1] || !squares[3] || !squares[5] || !squares[7]) {
            const corners = [1, 3, 5, 7];
            console.log("randomCorner - 2" );
            this.randomCorner(corners);
          }*/

    /*
        let randomCorner = Math.floor(Math.random() * corners.length);

        console.log(squares[corners[randomCorner]]);

        squares[corners[randomCorner]] = "O";

        //   squares[corners[randomCorner]] ? this.randomCorner() : squares[corners[randomCorner]] = "O";

        this.setSquares(squares);*/

  };



/*  attack = (squares, squaresA, squaresB, squaresC) => {
    const {computerSign} = this.props;

    if (squaresA === computerSign && squaresB === computerSign && !squaresC) {
      squaresC = computerSign;
      /!*          console.log("a = b");
                console.log("a " + a, "b " + b, "c " + c);
                console.log(line);*!/
      console.log('1 ' + squaresA, squaresB, squaresC);
      this.setSquares(squares);
      this.winGame(squaresA, squaresB, squaresC);
      return;
    }
    if (squaresA === computerSign && squaresC === computerSign && !squaresB) {
      squaresB = computerSign;
      /!*          console.log("a = c");
                console.log("a " + a, "b " + b, "c " + c);
                console.log(line);*!/
      console.log('2 ' + squaresA, squaresC, squaresB);
      this.setSquares(squares);
      this.winGame(squaresA, squaresB, squaresC);
      return;
    }
    if (squaresB === computerSign && squaresC === computerSign && !squaresA) {
      squaresA = computerSign;
      /!*          console.log("b = c");
                console.log("a " + a, "b " + b, "c " + c);
                console.log(line);*!/
      console.log('3 ' + squaresB, squaresC, squaresA);
      this.setSquares(squares);
      this.winGame(squaresA, squaresB, squaresC);
      return;
    }
};


  defence = (squares, squaresA, squaresB, squaresC) => {
    const {computerSign, playerSign} = this.props;
    if (squaresA === playerSign && squaresB === playerSign && !squaresC) {
      squaresC = computerSign;
      /!*            console.log("1");
                  console.log(line, squaresA, squaresB, squaresC);*!/
      console.log('4 ' + squaresA, squaresB, squaresC);
      this.setSquares(squares);
      return;
    }
    if (squaresA === playerSign && squaresC === playerSign && !squaresB) {
      squaresB = computerSign;
      /!*            console.log("2");
                  console.log(line, squaresA, squaresB, squaresC);*!/
      console.log('5 ' + squaresA, squaresC, squaresB);
      this.setSquares(squares);
      return;
    }
    if (squaresB === playerSign && squaresC === playerSign && !squaresA) {
      squaresA = computerSign;
      /!*            console.log("3");
                  console.log(line, squaresA, squaresB, squaresC);*!/
      console.log('6 ' + squaresB, squaresC, squaresA);
      this.setSquares(squares);
      return;
    }
};*/


  winGame = (squaresA, squaresB, squaresC) => {
    const {user, gameCounter ,computerSign, playerSign} = this.props;

/*

    console.log(squaresA, squaresB, squaresC);

          if (squaresA === computerSign && squaresB === computerSign && squaresC === computerSign) {
            console.log('win - comp');

          } else if (squaresA === playerSign && squaresB === playerSign && squaresC === playerSign) {
            console.log('win - player');

          } else {
            return;
          }
*/


    this.setState(currentState => ({
      activatePopup: currentState.activatePopup = true,
    }), () => {
      this.setState({
        activatePopup: false,
      });
    });

    let newCounter = {...gameCounter, counter: gameCounter.counter + 1};

    console.log(newCounter, this.props);

    this.props.changeCounter(newCounter);

  };


  playAgain = () => {
    const {computerSign} = this.props;

    this.cellRefs.map((item) => {
      item.classList.remove('signBox-appear-active');
    });

    if (computerSign === "X") {
      this.setState(currentState => ({
        isComputer: currentState.isComputer = true
      }), () => this.computer());
    } else {
      this.setState(currentState => ({
        isComputer: currentState.isComputer = false
      }));
    }
    this.setState(currentState => ({
      squares: currentState.squares = Array(9).fill(null),
    }));
  };

  setSquares = (squares) => {
    squares.forEach((item, index) => {
      if (item && !this.cellRefs[index].classList.contains('signBox-appear-active')) {
        this.cellRefs[index].className += ' signBox-appear-active';
      }
    });

    this.setState(currentState => ({
      squares: currentState.squares = squares,
      isComputer: currentState.isComputer = !this.state.isComputer
    }));

    /*    this.setState({
          squares: squares,
          isComputer: this.state.isComputer = !this.state.isComputer
        });*/

    console.log(this.state.isComputer)
  };


  /*
    getRefs = (cell) => {
      this.cellRefs.push(cell);
    //  console.log(this.getRefs);
    };*/

  render() {

    const {squares, playAgain, winLine, activatePopup} = this.state,
        {user, gameCounter} = this.props;

    /* const { user, gameCounter } = this.props;*/
    /*    console.log(winLine);
        console.log(playAgain);*/
    return (
        <div className="playGround">

          <ReactCSSTransitionGroup
              component="ul"
              transitionName="signBox"
              className="ground"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
          >
            {
              squares.map((box, boxIndex) => {
                return (
                    <li
                        ref={this.getRefs}
                        key={boxIndex}
                        id={boxIndex}
                        className="cell"
                        onClick={this.onClick}
                    >
                      {box}
                    </li>
                )
              })
            }
          </ReactCSSTransitionGroup>
          <button
              className="butt"
              disabled={playAgain}
              onClick={this.playAgain}
          >
            Play again
          </button>
          <Popup activatePopup={activatePopup} text={`${user.firstName} win`} delay={3000}/>
        </div>
    );
  }
}

/*

const mapState = ({user, gameCounter}) => ({
  user,
  gameCounter
});

const mapDispatch = {
  addGame
};

export const Game = withRouter(connect(mapState, mapDispatch)(PlayGround));

*/

/*    let newCounter = Object.assign({}, gameCounter);
    newCounter = newCounter.counter + 1;*/


/*          <ul className="ground"> {
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
          </ul>*/


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

/*  computer = () => {
    const {squares, isComputer} = this.state;
    console.log(isComputer, this.props.startGame, this.props.computerSign);
    this.computer();
  };*/

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

/*  winGame = (line, squares) => {
/!*    console.log(line, squares);*!/
    line.forEach( (elem) => {
      for(let i = 0; i < squares.length; i++) {
        if (elem === i) {

        }
      }
    })
  };*/

/*  getStyle = (index) => {
    const winLine = this.state.winLine;
    console.log(winLine, index);
    if (!winLine) return;
    winLine.forEach( (el) => {
      if (el === index) {
        console.log(el);
        return {
          color: 'red'
        }
      }
    });
  };*/