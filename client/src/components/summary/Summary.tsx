import * as React from 'react';

import AppState from '../app-state';
import Info from '../info';

import styles from '../info/Info.module.sass';

class Summary extends React.Component<{ appState: AppState }, {}> {
  public render() {
    const { appState } = this.props;

    return (
      <Info>
        <h3>Done!</h3>
        <p className={styles.infoParagraph}>
          You got {appState.correctCount} out {AppState.STEPS_COUNT}.
        </p>
      </Info>
    );
  }
}

export default Summary;
