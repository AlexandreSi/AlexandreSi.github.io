// @flow
import React from 'react';

import Column from './Column';
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
  };

  switchPlayer = (): void => {
    if (this.state.playerIdToPlay === 1) this.setState({ playerIdToPlay: 2 });
    if (this.state.playerIdToPlay === 2) this.setState({ playerIdToPlay: 1 });
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
    const lowestEmptyCellIndex = getLowestEmptyCellIndex(this.state.board[columnIndex]);
    if (lowestEmptyCellIndex !== undefined && lowestEmptyCellIndex !== null) {
      const boardToDisplay = this.state.board;
      boardToDisplay[columnIndex][lowestEmptyCellIndex] = this.state.playerIdToPlay;
      this.setState({ board: boardToDisplay });
      this.switchPlayer();
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
    return (
      <div style={styles.container}>
        <div style={styles.board}>
          {this.state.board.map((column, index) =>
            <Column
              key={index}
              column={column}
              onMouseEnter={() => this.onColumnEnter(index)}
              onMouseLeave={() => this.onColumnLeave(index)}
              onClick={() => this.onColumnClick(index)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Board;
