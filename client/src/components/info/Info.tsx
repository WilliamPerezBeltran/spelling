import * as React from 'react';

import styles from './Info.module.sass';

class Info extends React.Component<{}, {}> {
  public render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}

export default Info;
