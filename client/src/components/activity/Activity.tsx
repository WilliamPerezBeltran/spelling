import * as React from 'react';

import { observer } from 'mobx-react';
import SVG from 'react-inlinesvg';

import AppState from '../app-state';
import Button from '../button';
import Input from '../input';
import Letter from '../letter';
import Speech from '../speech';
import Actions from './Actions';

import speaker from '../../assets/images/speaker.svg';

import styles from './Activity.module.sass';

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
      <form onSubmit={this.onCheck} className={styles.activity}>
        <div className={styles.body}>
          <h3>
            Listen to the word and spell it using your keyboard or tapping the
            letters.
          </h3>

          <div className={styles.inputContainer}>
            <Input appState={appState} />
          </div>

          <div className={styles.lettersContainer}>
            {appState.term.data.map(({ char, available }, charIndex) => (
              <Letter
                key={`${charIndex}-${char}`}
                index={charIndex}
                char={char}
                available={available}
                appState={appState}
              />
            ))}
          </div>

          <div className={styles.speakContainer}>
            <Button
              type="button"
              onClick={this.speak}
              className={styles.speak}
              disabled={this.speech.speaking}
              loading={this.speech.speaking}
            >
              <SVG src={speaker} />
            </Button>
          </div>
        </div>

        <Actions appState={appState} />
      </form>
    );
  }

  private onCheck = (e: React.FormEvent<HTMLFormElement>) => {
    const { appState } = this.props;

    e.preventDefault();

    if (!appState.readyToCheck) {
      return;
    }

    appState.check();
  };

  private speak = () => {
    this.speech.speak(this.props.appState.term.original);
  };
}

export default Form;
