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

    this.cellRefs = [];
    this.getRefs = element => {
      this.cellRefs.push(element);
    };

    this.state = {
      squares: Array(9).fill(null),
      isComputer: false,
      playAgain: true,
      activatePopup: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {startGame, computerSign} = this.props;
    if (prevProps.startGame !== startGame && computerSign === "X") {
      this.setState(currentState => ({
        isComputer: !currentState.isComputer,
        playAgain: !currentState.playAgain
      }), () => this.computer());
    }
  }

  onClick = (event) => {
    const {squares, isComputer} = this.state,
        {playerSign, startGame} = this.props;
    if (isComputer || !startGame || event.target.innerHTML) return;
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.checkSquares(true);
    this.computer();
  };

  randomCorner = () => {
    const squares = this.state.squares.slice(),
        corners = [0, 1, 2, 3, 5, 6, 7, 8];
    console.log('randomCorner');
    if (!squares[0] || !squares[1] || !squares[2] || !squares[3] || !squares[5] || !squares[6] || !squares[7] || !squares[8]) {
      let randomCorner = Math.floor(Math.random() * corners.length);
      if (!squares[corners[randomCorner]]) {
        squares[corners[randomCorner]] = this.props.computerSign;
        this.setSquares(squares);
      } else {
        this.randomCorner();
      }
    }
  };

  computer = () => {
    const squares = this.state.squares.slice(),
        length = squares.length,
        middle = (length - 1) / 2,
        computerSign = this.props.computerSign,
        playerSign = this.props.playerSign,
        isComputer = this.state.isComputer,
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

    if (!isComputer) return;

    this.checkSquares(false, true);

    /*    for (let i = 0; i < lineLength; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] === computerSign && squares[b] === computerSign && !squares[c]) {
            squares[c] = computerSign;
            console.log('1 ' + squares[a], squares[b], squares[c]);
            this.setSquares(squares);
            this.winGame(squares[a], squares[b], squares[c]);
            return;
          }
          if (squares[a] === computerSign && squares[c] === computerSign && !squares[b]) {
            squares[b] = computerSign;
            console.log('2 ' + squares[a], squares[c], squares[b]);
            this.setSquares(squares);
            this.winGame(squares[a], squares[b], squares[c]);
            return;
          }
          if (squares[b] === computerSign && squares[c] === computerSign && !squares[a]) {
            squares[a] = computerSign;
            console.log('3 ' + squares[b], squares[c], squares[a]);
            this.setSquares(squares);
            this.winGame(squares[a], squares[b], squares[c]);
            return;
          }
        }

        for (let i = 0; i < lineLength; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] === playerSign && squares[b] === playerSign && !squares[c]) {
            squares[c] = computerSign;
            this.setSquares(squares);
            return;
          }
          if (squares[a] === playerSign && squares[c] === playerSign && !squares[b]) {
            squares[b] = computerSign;
            this.setSquares(squares);
            return;
          }
          if (squares[b] === playerSign && squares[c] === playerSign && !squares[a]) {
            squares[a] = computerSign;
            this.setSquares(squares);
            return;
          }
        }*/

    if (!squares[middle]) {
      squares[middle] = computerSign;
      this.setSquares(squares);
      return;
    }

    this.randomCorner();
  };


  checkSquares = (player, attack, defence) => {
    const squares = this.state.squares.slice(),
        length = squares.length,
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

    for (let i = 0; i < lineLength; ++i) {
      const [a, b, c] = lines[i];

      console.log(i, lineLength);

      if (attack) {

        /*        squares[a], squares[b], squares[c]*/

        console.log('attack', 'lines ' + lines[i]);

        if (squares[a] === computerSign && squares[b] === computerSign && !squares[c]) {
          squares[c] = computerSign;
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          console.log(lines[i]);
          console.log('1 ' + 'a ' + squares[a], 'b ' + squares[b], 'c ' + squares[c]);
          return;
        }
        if (squares[a] === computerSign && squares[c] === computerSign && !squares[b]) {
          squares[b] = computerSign;
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          console.log(lines[i]);
          console.log('2 ' + 'a ' + squares[a], 'c ' + squares[c], 'b ' + squares[b]);
          return;
        }
        if (squares[b] === computerSign && squares[c] === computerSign && !squares[a]) {
          squares[a] = computerSign;
          this.setSquares(squares);
          this.winGame(squares[a], squares[b], squares[c]);
          console.log(lines[i]);
          console.log('3 ' + 'b ' + squares[b], 'c ' + squares[c], 'a ' + squares[a]);
          return;
        }
        /*        if (i === lineLength) {
                  this.checkSquares( false ,false, true);
                }*/
      }

      if (defence) {

        console.log('defence', 'lines ' + lines[i]);

        if (squares[a] === playerSign && squares[b] === playerSign && !squares[c]) {
          squares[c] = computerSign;
          this.setSquares(squares);
          return;
        }
        if (squares[a] === playerSign && squares[c] === playerSign && !squares[b]) {
          squares[b] = computerSign;
          this.setSquares(squares);
          return;
        }
        if (squares[b] === playerSign && squares[c] === playerSign && !squares[a]) {
          squares[a] = computerSign;
          this.setSquares(squares);
          return;
        }
        /*        if (i === lineLength) {
                  this.checkSquares( false ,true, false);
                }*/
      }

      if (player) {

        console.log('player', 'lines ' + lines[i]);

        if (squares[a] === playerSign && squares[b] === playerSign && squares[c] === playerSign) {
          squares[a] = computerSign;
          this.setSquares(squares);
          this.setState(currentState => ({
            isComputer: currentState.isComputer = !this.state.isComputer
          }));
          this.winGame(squares[a], squares[b], squares[c]);
          return;
        }
      }


    }


  };


  winGame = () => {
    const {gameCounter} = this.props;
    this.setState(currentState => ({
      activatePopup: currentState.activatePopup = true,
    }), () => {
      this.setState({
        activatePopup: false,
      });
    });
    let newCounter = {...gameCounter, counter: gameCounter.counter + 1};
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
      squares: currentState.squares = Array(9).fill(null)
    }));
  };

  setSquares = (squares) => {
    squares.forEach((item, index) => {
      if (item && !this.cellRefs[index].classList.contains('signBox-appear-active')) {
        this.cellRefs[index].className += ' signBox-appear-active';
      }
    });

    /*    this.setState(currentState => ({
          squares: currentState.squares = squares,
          isComputer: currentState.isComputer = !this.state.isComputer
        }));*/

    this.setState({
      squares: squares,
      isComputer: this.state.isComputer = !this.state.isComputer
    });
  };

  render() {

    const {squares, playAgain, activatePopup} = this.state,
        {user} = this.props;

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
