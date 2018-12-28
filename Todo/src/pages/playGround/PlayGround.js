import React, {Component} from 'react';

import {Popup} from '../popup';
/*import {GameMod} from '../game';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCounter, updateCount} from '../../services/gameService';
import {store, addGame} from '../../store';*/
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './playGround.scss';

export class PlayGround extends Component {
  constructor(props) {
    super(props);

    this.popupText = '';
    this.gameFinished = false;
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
      }), () => this.checkSquares(false, true));
    }
  }

  onClick = (event) => {
    const {squares, isComputer} = this.state,
        {playerSign, computerSign, startGame} = this.props;


  //  console.log('isComputer ' + isComputer, ' startGame ' + startGame,  ' playerS ' + playerSign,  ' computerS ' + computerSign);

    if (!playerSign || !computerSign) {
      this.popupText = ['You need to pick your sign first ', <b>X</b>, ' or ', <b>O</b>];
      this.showPopup();
    } else if (!startGame) {
      this.popupText = 'You need to press start button';
      this.showPopup();
    }

    if (isComputer || !startGame || event.target.innerHTML || this.gameFinished) return;
    squares[event.target.id] = playerSign;
    this.setSquares(squares);
    this.checkSquares(true);
    this.checkSquares(false, true);
    /*    setTimeout( () => {
          this.checkSquares(false, true);
        }, 0);*/
  };

  randomCorner = () => {
    const squares = this.state.squares.slice(),
        corners = [0, 1, 2, 3, 5, 6, 7, 8];
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

  checkSquares = (player, attack, defence) => {

    if (this.gameFinished) return;

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

    if (!squares[middle] && attack) {
      squares[middle] = computerSign;
      this.setSquares(squares);
      return;
    }

    for (let i = 0; i < lineLength; ++i) {
      const [a, b, c] = lines[i];

      if (attack) {

        if (squares[a] === computerSign && squares[b] === computerSign && !squares[c]) {
          squares[c] = computerSign;
          this.setSquares(squares);
          this.winGame('computer');
          return;
        }
        if (squares[a] === computerSign && squares[c] === computerSign && !squares[b]) {
          squares[b] = computerSign;
          this.setSquares(squares);
          this.winGame('computer');
          return;
        }
        if (squares[b] === computerSign && squares[c] === computerSign && !squares[a]) {
          squares[a] = computerSign;
          this.setSquares(squares);
          this.winGame('computer');
          return;
        }
        if (i + 1 === lineLength) {
          this.checkSquares(false, false, true);
        }
      }

      if (defence) {

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
        if (i + 1 === lineLength) {
          this.randomCorner();
        }
      }

      if (player) {
        if (squares[a] === playerSign && squares[b] === playerSign && squares[c] === playerSign) {
          this.winGame('player');
          return;
        }
      }
    }

  };


  winGame = (player) => {
    const {gameCounter, user} = this.props;

    if (player === 'computer') {
      this.popupText = `Computer win`;
    } else if (player === 'player') {
      this.popupText = `${user.firstName} win`;
    } else {
      this.popupText = `Draw`;
    }

    this.showPopup();

    this.setState({
      playAgain: !this.state.playAgain,
    });

/*    this.setState(currentState => ({
      playAgain: !currentState.playAgain,
    }));*/

    let newCounter = {...gameCounter, counter: gameCounter.counter + 1};
    this.props.changeCounter(newCounter);
    this.gameFinished = true;
  };

  playAgain = () => {
    const {computerSign} = this.props;
    this.gameFinished = false;
    this.cellRefs.map((item) => {
      item.classList.remove('signBox-appear-active');
    });

    this.setState(currentState => ({
      isComputer: !currentState.isComputer,
      playAgain: !currentState.playAgain,
      squares: currentState.squares = Array(9).fill(null)
    }), () => {
      if (computerSign === "X") {
        this.checkSquares(false, true);
      }
    });

    /*
          this.setState(currentState => ({
            isComputer: !currentState.isComputer,
          }), () => this.checkSquares(false, true));

        } else {
          this.setState(currentState => ({
            isComputer: !currentState.isComputer
          }));
        }*/

  };

  setSquares = (squares) => {
    let i = 0,
        length = squares.length;
    squares.forEach((item, index) => {
      if (item && !this.cellRefs[index].classList.contains('signBox-appear-active')) {
        this.cellRefs[index].className += ' signBox-appear-active';
      }
      if (item) {
        i++;
        if (i === length) {
          setTimeout(() => {
            if (!this.gameFinished) {
              this.winGame();
            }
          }, 0);
        }
      }

    });

    console.log('isComputer ', this.state.isComputer);

    this.setState({
      squares: squares,
      isComputer: this.state.isComputer = !this.state.isComputer
    });

/*        this.setState(currentState => ({
          squares: currentState.squares = squares,
          isComputer: currentState.isComputer = !this.state.isComputer,
        }));*/

  };

  showPopup = () => {
    this.setState(currentState => ({
      activatePopup: currentState.activatePopup = true,
    }), () => {
      this.setState({
        activatePopup: false,
      });
    });
  };

  render() {

    const {squares, playAgain, activatePopup} = this.state;

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
          <Popup
              activatePopup={activatePopup}
              text={this.popupText}
              delay={3000}
          />
        </div>
    );
  }
}

/* computer = () => {
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

 //  if (!isComputer) return;



   /!*    for (let i = 0; i < lineLength; i++) {
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
       }*!/

/!*
   if (!squares[middle]) {
     squares[middle] = computerSign;
     this.setSquares(squares);
     return;
   }
*!/

/!*    setTimeout( () => {
     this.randomCorner();
   }, 0);*!/

 };
*/

/*
  computer = () => {

    console.log('computer');

    if (this.gameFinished) return;

    const squares = this.state.squares.slice(),
      length = squares.length,
      middle = (length - 1) / 2,
      computerSign = this.props.computerSign;

    console.log('gameFinished', this.gameFinished);

      if (!squares[middle]) {
        squares[middle] = computerSign;
        this.setSquares(squares);
        return;
      }

    this.checkSquares(false, true);

  };
*/