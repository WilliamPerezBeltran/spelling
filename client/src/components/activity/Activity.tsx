import * as React from 'react';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import AppState from '../app-state';
import Form from '../form';
import Speech from '../speech';

import styles from './Activity.module.sass';

@observer
class Activity extends React.Component<{ appState: AppState }, {}> {
  private speech = new Speech();

  public componentDidMount() {
    this.speak();
  }

  public render() {
    return (
      <div className={styles.activity}>
        <DevTools />
        <h3>
          Listen to the word and spell it using your keyboard or tapping the
          letters.
        </h3>

        <Form appState={this.props.appState} />

        <button
          onClick={this.speak}
          className={styles.button}
          disabled={this.speech.speaking}
        >
          Speak!
        </button>
      </div>
    );
  }

  private speak = () => {
    this.speech.speak(this.props.appState.term.original);
  };
}

export default Activity;
