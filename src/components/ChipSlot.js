// @flow
import React from 'react';
import { Circle } from 'react-shapes';

import appStyle from '../config/appStyle';

const styles = {
  container: {
    padding: 10,
  },
}

type Props = {
  cellValue: number,
};

class ChipSlot extends React.Component<Props> {
  render() {
    const colorMap = {};
    colorMap[-2] = appStyle.colors.redPreview;
    colorMap[-1] = appStyle.colors.yellowPreview;
    colorMap[0] = appStyle.colors.white;
    colorMap[1] = appStyle.colors.yellow;
    colorMap[2] = appStyle.colors.red;
    return (
      <div style={styles.container}>
        <Circle r={30} fill={{ color: colorMap[this.props.cellValue] }} />
      </div>
    );
  }
}

export default ChipSlot;
