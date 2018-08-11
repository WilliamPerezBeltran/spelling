import * as React from 'react';

import styles from './Letter.module.sass';

import AppState from './AppState';

interface IProps {
  index: number;
  char: string;
  available: boolean;
  appState: AppState;
}

class Letter extends React.Component<IProps, {}> {
  public render() {
    return (
      <div className={styles.container} onClick={this.onClick}>
        <span
          className={
            this.props.available ? styles.char : styles.charUnavailable
          }
        >
          {this.props.char === ' ' ? '_' : this.props.char}
        </span>
      </div>
    );
  }

  private onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.available) {
      return;
    }

    this.props.appState.tap(this.props.index);
  };
}

export default Letter;
