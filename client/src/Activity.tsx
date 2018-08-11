import * as React from 'react';

import DevTools from 'mobx-react-devtools';

import AppState from './AppState';
import Form from './Form';

import styles from './Activity.module.sass';

class Activity extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <div className={styles.activity}>
        <DevTools />
        <h3>
          Listen to the word and spell it using your keyboard or tapping the
          letters.
        </h3>

        <Form appState={this.props.appState} />

        <p>{this.props.appState.term.original}</p>
      </div>
    );
  }
}

export default Activity;
