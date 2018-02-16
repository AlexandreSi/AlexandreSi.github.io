// @flow
import React from 'react';

import Column from './Column';
import DisplayMessage from './DisplayMessage';
import Game from '../util/Game';
import getLowestEmptyCellIndex from '../services/Array.service';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#d2f0fb',
    width: '100%',
    justifyContent: 'center',
  },
  board: {
    display: 'flex',
  },
}

type State = {
  board: Array<Array<number>>,
  playerIdToPlay: number,
  game: Game,
  message: string,
}

class Board extends React.Component<*, State> {
  state = {
    board: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    playerIdToPlay: 1,
    game: new Game(),
    message: '',
  };

  componentDidMount() {
    const { game } = this.state;
    this.setState({ board: game.getBoardTransposed() });
  }

  switchPlayer = (): void => {
    if (this.state.playerIdToPlay === 1) this.setState({ playerIdToPlay: 2 });
    if (this.state.playerIdToPlay === 2) this.setState({ playerIdToPlay: 1 });
  }

  checkForWinner = (): void => {
    const { game } = this.state;
    const winner = game.checkForWin();
    if (!!winner) {
      this.setState({ message: `Le joueur ${winner} a gagné !` });
    }
  }

  onColumnEnter = (columnIndex: number): void => {
    const lowestEmptyCellIndex = getLowestEmptyCellIndex(this.state.board[columnIndex]);
    if (lowestEmptyCellIndex !== undefined && lowestEmptyCellIndex !== null) {
      const boardToDisplay = this.state.board;
      boardToDisplay[columnIndex][lowestEmptyCellIndex] = -this.state.playerIdToPlay;
      this.setState({ board: boardToDisplay });
    }
  }

  onColumnClick = (columnIndex: number): void => {
    const { game } = this.state;
    try {
      if (!!this.state.message && !!game.checkForWin()) {
        const newGame = new Game();
        this.setState({
          message: '',
          game: newGame,
          board: newGame.getBoardTransposed(),
          playerIdToPlay: 1,
        });
      } else if (!!this.state.message) {
        this.setState({ message: '' });
      } else {
        game.playChip(this.state.playerIdToPlay, columnIndex);
        this.switchPlayer();
        this.setState({ board: game.getBoardTransposed() });
        this.checkForWinner();
      }
    } catch (error) {
      this.setState({ message: 'Cette colonne est pleine !' });
    }
  }

  onColumnLeave = (columnIndex: number): void => {
    const boardToDisplay = this.state.board;
    boardToDisplay[columnIndex] = boardToDisplay[columnIndex].reduce((columnAccumulator, cell) => {
      columnAccumulator.push(Math.max(0, cell))
      return columnAccumulator;
    }, []);
    this.setState({ board: boardToDisplay });
  }

  render() {
    const { message } = this.state;
    return (
      <div style={styles.container}>
        <DisplayMessage message={message}/>
        <div style={styles.board}>
          {this.state.board.map((column, index) =>
            <Column
              key={index}
              column={column}
              onMouseEnter={!message ? () => this.onColumnEnter(index) : () => {}}
              onMouseLeave={!message ? () => this.onColumnLeave(index) : () => {}}
              onClick={() => this.onColumnClick(index)}
            />,
          )}
        </div>
      </div>
    );
  }
}

export default Board;
