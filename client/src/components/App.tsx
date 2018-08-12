import * as React from 'react';

import Activity from './activity';
import AppState from './app-state';

import styles from './App.module.sass';

const appState = new AppState();

class App extends React.Component {
  public render() {
    return (
      <div className={styles.app}>
        <Activity appState={appState} />
      </div>
    );
  }
}

export default App;
