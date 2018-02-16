// @flow
import React from 'react';
import appStyle from '../config/appStyle';
import ChipSlot from './ChipSlot';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: appStyle.colors.blue,
    width: '60%',
    justifyContent: 'center',
  },
  board: {
    display: 'flex',
  },
}

type Props = {
  column: Array<number>,
  onMouseEnter: (index: number) => void,
  onMouseLeave: (index: number) => void,
  onClick: (index: number) => void,
};

class Column extends React.Component<Props> {
  render() {
    return (
      <div
        style={styles.container}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
      >
        {this.props.column.map((cell, index) => <ChipSlot key={index} cellValue={cell}/>)}
      </div>
    );
  }
}

export default Column;
