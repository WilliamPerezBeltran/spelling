import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Input from '../input';
import Letter from '../letter';

import styles from './Form.module.sass';

@observer
class Form extends React.Component<{ appState: AppState }, {}> {
  public render() {
    const { appState } = this.props;
    return (
      <form onSubmit={this.onCheck} className={styles.form}>
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

        <input
          type="submit"
          value="Check"
          disabled={!appState.ready || appState.checked}
        />
      </form>
    );
  }

  private onCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!this.props.appState.ready) {
      return;
    }

    this.props.appState.check();
  };
}

export default Form;
