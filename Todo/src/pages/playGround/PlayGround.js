import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Popup } from '../../pages/modal';

import './playGround.scss';

export class PlayGround extends Component {
  constructor(props) {
    super(props);

    this.popupText = '';
    this.gameFinished = false;
    this.cellRefs = [];
    this.getRefs = (element) => {
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
    const { startGame, computerSign } = this.props;
    if (startGame && startGame !== prevProps.startGame && computerSign === 'X') {
      this.setState(currentState => ({
        isComputer: currentState.isComputer = true,
      }), () => this.checkSquares(false, true));
    }
    if (computerSign !== prevProps.computerSign && computerSign !== null) {
      this.gameFinished = false;
      this.cellRefs.map((item) => {
        item.classList.remove('signBox-enter-active');
      });
      this.setState(currentState => ({
        isComputer: computerSign === 'X' ? currentState.isComputer = true : currentState.isComputer = false,
        playAgain: currentState.playAgain = true,
        squares: currentState.squares = Array(9).fill(null)
      }));
    }
  }

  onClick = (event) => {
    const { squares, isComputer } = this.state,
      { playerSign, computerSign, startGame } = this.props;
    if (!playerSign || !computerSign) {
      this.popupText = ['You need to pick your sign first ', <b key={'020102'}>X</b>, ' or ', <b key={'030201'}>O</b>];
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
  };

  randomCorner = () => {
    const squares = this.state.squares.slice(),
      corners = [0, 1, 2, 3, 5, 6, 7, 8];
    if (!squares[0] || !squares[1] || !squares[2] || !squares[3] || !squares[5] || !squares[6] || !squares[7] || !squares[8]) {
      const randomCorner = Math.floor(Math.random() * corners.length);
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
    const { user, playerSign } = this.props;
    const sign = playerSign === 'X' ? 'X' : 'O';
    if (player === 'computer') {
      this.popupText = 'Computer win';
      this.updateCounter(`p ${sign} lose`);
    } else if (player === 'player') {
      this.popupText = `${user.firstName} win`;
      this.updateCounter(`p ${sign} win`);
    } else {
      this.popupText = 'Draw';
      this.updateCounter(`p ${sign} draw`);
    }
    this.showPopup();
    this.setState({
      playAgain: !this.state.playAgain,
    });
    this.gameFinished = true;
  };

  updateCounter = (info) => {
    const { user } = this.props;
    let newCounter = {};
    switch (info) {
      case 'p X win':
        newCounter = {
          ...user,
          X: { ...user.X, gameCounter: user.X.gameCounter + 1, winGames: user.X.winGames + 1 } };
        break;
      case 'p X lose':
        newCounter = {
          ...user,
          X: { ...user.X, gameCounter: user.X.gameCounter + 1, loseGames: user.X.loseGames + 1 }
        };
        break;
      case 'p X draw':
        newCounter = {
          ...user,
          X: { ...user.X, gameCounter: user.X.gameCounter + 1, drawGames: user.X.drawGames + 1 }
        };
        break;
      case 'p O win':
        newCounter = {
          ...user,
          O: { ...user.O, gameCounter: user.O.gameCounter + 1, winGames: user.O.winGames + 1 } };
        break;
      case 'p O lose':
        newCounter = {
          ...user,
          O: { ...user.O, gameCounter: user.O.gameCounter + 1, loseGames: user.O.loseGames + 1 }
        };
        break;
      case 'p O draw':
        newCounter = {
          ...user,
          O: { ...user.O, gameCounter: user.O.gameCounter + 1, drawGames: user.O.drawGames + 1 }
        };
        break;
      default:
        console.log('Error');
    }
    this.props.changeCounter(newCounter);
  };

  playAgain = () => {
    const { computerSign } = this.props;
    this.gameFinished = false;
    this.cellRefs.map((item) => {
      item.classList.remove('signBox-enter-active');
    });
    this.setState(currentState => ({
      isComputer: computerSign === 'X' ? currentState.isComputer = true : currentState.isComputer = false,
      playAgain: !currentState.playAgain,
      squares: currentState.squares = Array(9).fill(null)
    }), () => {
      if (computerSign === 'X') {
        this.checkSquares(false, true);
      }
    });
  };

  setSquares = (squares) => {
    let i = 0,
      length = squares.length;
    squares.forEach((item, index) => {
      if (item && !this.cellRefs[index].classList.contains('signBox-enter-active')) {
        this.cellRefs[index].className += ' signBox-enter-active';
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
    this.setState({
      squares,
      isComputer: this.state.isComputer = !this.state.isComputer
    });
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

    const { squares, playAgain } = this.state;

    return (
      <div className="playGround">
        <ul className="ground">
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
                  {/*                  <CSSTransition
                    in={this.state.in}
                  //  key={boxIndex + 10}
                    timeout={500}
                    classNames="signBox"
                  >
                  <span>{box}</span>
                  </CSSTransition>*/}

                </li>
              );
            })
          }
        </ul>

        <button
          type="button"
          className="butt start-button"
          disabled={playAgain}
          onClick={this.playAgain}
        >
          {'Play again'}
        </button>

        <Popup activatePopup={this.state.activatePopup} text={this.popupText}/>

      </div>
    );
  }
}
