// @flow
import React from 'react';

import appStyle from '../config/appStyle';

const styles = {
  container: {
    padding: '30px',
    backgroundColor: appStyle.colors.white,
    border: `solid 2px ${appStyle.colors.redPreview}`,
    width: 'auto',
    position: 'absolute',
    top: '200px',
    borderRadius: '10px',
  },
};

type Props = {
  message: string,
};

const DisplayMessage = (props: Props) => (
  !!props.message && (
    <div style={styles.container}>
      {props.message}
    </div>
  )
);

export default DisplayMessage;
