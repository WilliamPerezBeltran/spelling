import * as React from 'react';

import DevTools from 'mobx-react-devtools';

import AppState from './app-state';
import Lesson from './lesson';

import styles from './App.module.sass';

const appState = new AppState();

class App extends React.Component {
  public render() {
    return (
      <div className={styles.app}>
        <DevTools />
        <Lesson appState={appState} />
      </div>
    );
  }
}

export default App;
