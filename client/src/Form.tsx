import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from './AppState';
import Input from './Input';
import Letter from './Letter';

import styles from './Form.module.sass';

@observer
class Form extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <form onSubmit={this.onCheck}>
        <div className={styles.inputContainer}>
          <Input appState={this.props.appState} />
        </div>

        <div className={styles.lettersContainer}>
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
    )
  }

  private onCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.appState.check();
  };
}

export default Form;
