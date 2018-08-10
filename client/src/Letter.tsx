import * as React from 'react';

import styles from './Letter.module.sass';

class Letter extends React.Component<{ letter: string }, {}> {
  public render() {
    return (
      <div className={styles.container}>
        <span className={styles.letter}>
          {this.props.letter === ' ' ? '_' : this.props.letter}
        </span>
      </div>
    );
  }
}

export default Letter;
