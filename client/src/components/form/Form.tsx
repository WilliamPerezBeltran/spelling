import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Input from '../input';
import Letter from '../letter';
import Speech from '../speech';

import styles from './Form.module.sass';

@observer
class Form extends React.Component<{ appState: AppState }, {}> {
  private speech = new Speech();

  public componentDidMount() {
    setTimeout(() => {
      this.speak();
    }, 300);
  }

  public render() {
    const { appState } = this.props;
    return (
      <form onSubmit={this.onCheck} className={styles.form}>
        <div className={styles.body}>
          <h3>
            Listen to the word and spell it using your keyboard or tapping the
            letters.
          </h3>

          <div className={styles.inputContainer}>
            <Input appState={this.props.appState} />
          </div>

          <div className={styles.lettersContainer}>
            {appState.term.data.map(({ char, available }, index) => (
              <Letter
                key={`${index}-${char}`}
                index={index}
                char={char}
                available={available}
                appState={appState}
              />
            ))}
          </div>

          <div className={styles.speakContainer}>
            <button
              type="button"
              onClick={this.speak}
              className={styles.speak}
              disabled={this.speech.speaking}
            >
              Speak!
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <div>1/10</div>
          <input
            type="submit"
            value={appState.checked ? 'Next' : 'Check'}
            className={styles.check}
            disabled={!appState.ready}
          />
        </div>
      </form>
    );
  }

  private onCheck = (e: React.FormEvent<HTMLFormElement>) => {
    const { appState } = this.props;

    e.preventDefault();

    if (appState.checked) {
      return;
    }

    if (!appState.ready) {
      return;
    }

    this.props.appState.check();
  };

  private speak = () => {
    this.speech.speak(this.props.appState.term.original);
  };
}

export default Form;
