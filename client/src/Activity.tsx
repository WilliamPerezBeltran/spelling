import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from './AppState';
import Letter from './Letter';

import styles from './Activity.module.sass';

@observer
class Activity extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <div className={styles.activity}>
        <h3>
          Listen to the word and spell it using your keyboard or tapping the
          letters.
        </h3>

        <p>{this.props.appState.term}</p>

        <input type="text" />

        <div>
          {this.props.appState.letters.map((letter, index) => (
            <Letter key={`${index}-${letter}`} letter={letter} />
          ))}
        </div>

        <input type="submit" />
      </div>
    );
  }
}

export default Activity;
