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

    this.state = {
      squares: Array(9).fill(null),
      isComputer: false,
      playAgain: true,
      winLine: null,
      activatePopup: false,
      counter: this.props.gameCounter.counter,
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

/*
  componentDidMount() {
    getCounter()
        .then(this.props.addGame);
  }
*/


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

/*    console.log(isComputer, this.props.startGame, this.props.computerSign);*/

    if (isComputer || !startGame) return;
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.computer();
  };


  randomCorner = (corners) => {

    const squares = this.state.squares.slice();
    /*    corners = [0, 2, 6, 8]; */

/*    console.log("random corner function", corners);*/

    let randomCorner = Math.floor(Math.random() * corners.length);

/*    console.log(corners[randomCorner]);*/

    if (!squares[corners[randomCorner]]) {
      squares[corners[randomCorner]] = this.props.computerSign;
      this.setSquares(squares);
    } else {
      this.randomCorner(corners);
    }

    // !squares[corners[randomCorner]] ? squares[corners[randomCorner]] = this.props.computerSign : this.randomCorner(corners);

  };


  computer = () => {
    const squares = this.state.squares.slice(),
        length = squares.length,
        middle = (length - 1) / 2,
        computerSign = this.props.computerSign,
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

/*      let line = lines[i];*/

      if (squares[a] === computerSign && squares[b] === computerSign && !squares[c]) {
        squares[c] = computerSign;
        console.log("a = b");

        this.setState(currentState => ({
          winLine: currentState.winLine = lines[i],
        }));

       /* console.log(line, squares);*/
/*        this.winGame(line, squares);*/

        this.setSquares(squares);

        this.winGame();

        return;
      }
      if (squares[a] === computerSign && squares[c] === computerSign && !squares[b]) {
        squares[b] = computerSign;
        console.log("a = c");


        this.setState(currentState => ({
          winLine: currentState.winLine = lines[i],
        }));


        this.setSquares(squares);

        this.winGame();

        return;
      }
      if (squares[b] === computerSign && squares[c] === computerSign && !squares[a]) {
        squares[a] = computerSign;
        console.log("b = c");

        this.setState(currentState => ({
          winLine: currentState.winLine = lines[i],
        }));

        this.setSquares(squares);

        this.winGame();

        return;
      }

      if (squares[a] && squares[a] === squares[b] && !squares[c]) {
        console.log("1", squares);

        squares[c] = computerSign;
        this.setSquares(squares);
        return;
      }
      if (squares[a] && squares[a] === squares[c] && !squares[b]) {
        console.log("2", squares);

        squares[b] = computerSign;
        this.setSquares(squares);
        return;
      }
      if (squares[b] && squares[b] === squares[c] && !squares[a]) {
        console.log("3", squares);

        squares[a] = computerSign;
        this.setSquares(squares);
        return;
      }

    }

    if (!squares[middle]) {
      squares[middle] = computerSign;
      this.setSquares(squares);
      return;
    }

    if (!squares[0] || !squares[1] || !squares[2] || !squares[3] || !squares[5] || !squares[6] || !squares[7] || !squares[8]) {
      const corners = [0, 1, 2, 3, 5, 6, 7, 8];
      console.log("randomCorner");
      this.randomCorner(corners);
    }

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

  winGame = () => {
    const { user, gameCounter } = this.props;
    const { gameCounter2 } = this.state;

    this.setState(currentState => ({
      activatePopup: currentState.activatePopup = true,
    }), () => {
      this.setState({
        activatePopup: false,
      });
    });

  //  this.props.changeCounter(+ 1);

  //  console.log(gameCounter2);

   console.log( this.props);



    this.props.changeCounter(gameCounter.counter = + 1)

  //  this.props.dispatch(addGame({gameCounter}));


/*

    getCounter()
        .then(gameCounter => this.props.addGame(gameCounter))
        /!* eslint no-console: ["error", { allow: ["log"] }] *!/
        .catch(console.log);
*/


/*
    updateCount(gameCounter2)
        .then(() => this.setState({ gameCounter2: gameCounter2.counter +1 }))
        /!* eslint no-console: ["error", { allow: ["log"] }] *!/
        .catch(console.log);
*/

  //  store.dispatch({ type: 'ADD_GAME' });

/*    updateCount()
        .then(gameCounter => this.props.addGame(gameCounter))
        /!* eslint no-console: ["error", { allow: ["log"] }] *!/
        .catch(console.log);*/


   // this.props.addGame(gameCounter);


/*    updateCount = (gameCounter) => {
      this.props.addGame(gameCounter);
    };*/

/*    updateCount(gameCounter)
    .then(() => this.setState({gameCounter: gameCounter + 1}))
      /!* eslint no-console: ["error", { allow: ["log"] }] *!/
          .catch(console.log);*/
  };


  playAgain = () => {
/*    console.log(this.props.computerSign);*/
    const {computerSign} = this.props;
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
/*    console.log(this.state.isComputer);*/
    this.setState({
      squares: squares,
      isComputer: this.state.isComputer = !this.state.isComputer
    });
/*    console.log(this.state.isComputer)*/
  };


  render() {

    const {squares, playAgain, winLine, activatePopup} = this.state,
          { user, gameCounter } = this.props;

    /* const { user, gameCounter } = this.props;*/
/*    console.log(winLine);
    console.log(playAgain);*/
    return (
        <div className="playGround">

          <ReactCSSTransitionGroup
              component="ul"
              transitionName="sign"
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
          <Popup activatePopup={activatePopup} text={`${user.firstName} win`} delay={5000} />
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