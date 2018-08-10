import * as React from 'react';

import Activity from './Activity';
import AppState from './AppState';

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
