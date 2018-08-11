import * as React from 'react';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import AppState from './AppState';
import Input from './Input';
import Letter from './Letter';

import styles from './Activity.module.sass';

@observer
class Activity extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <div className={styles.activity}>
        <DevTools />
        <h3>
          Listen to the word and spell it using your keyboard or tapping the
          letters.
        </h3>

        <p>{this.props.appState.term.original}</p>

        <form onSubmit={this.onCheck}>
          <Input appState={this.props.appState} />

          <div>
            {this.props.appState.term.data.map(({ char, available }, index) => (
              <Letter
                key={`${index}-${char}`}
                index={index}
                char={char}
                available={available}
                appState={this.props.appState}
              />
            ))}
          </div>

          <input type="submit" value="Check" />
        </form>
      </div>
    );
  }

  private onCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.appState.check();
  };
}

export default Activity;
