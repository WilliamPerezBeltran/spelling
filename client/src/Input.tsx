import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from './AppState';

import styles from './Input.module.sass';

@observer
class Input extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return this.props.appState.term.chars.map((char, index) => (
      <input
        key={`${index}-${char}`}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
        type="text"
        value={this.props.appState.inputArray[index] || ''}
        maxLength={1}
        className={styles.input}
        data-index={index}
      />
    ));
  }

  private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = parseInt(e.currentTarget.dataset.index || '', 10);
    const elements = e.currentTarget.form!
      .elements as HTMLFormControlsCollection;

    if (e.which === 37 || e.which === 39) {
      e.preventDefault();
      const nextIndex = e.which === 37 ? index - 1 : index + 1;

      if (elements[nextIndex]) {
        const element = elements[nextIndex] as HTMLInputElement;
        element.focus();
      }
    }
  };

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      'Enter',
      ...this.props.appState.term.available.map(letter => letter.char)
    ];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
    }
  }

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const index = parseInt(e.currentTarget.dataset.index || '', 10);

    this.props.appState.setInput(index, target.value);
  };
}

export default Input;