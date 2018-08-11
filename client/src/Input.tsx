import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from './AppState';

// import styles from './Input.module.sass';

@observer
class Input extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <input
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
        type="text"
        value={this.props.appState.input}
      />
    );
  }

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      'Enter',
      ...this.props.appState.term.available.map(letter => letter.char)
    ];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.appState.setInput(e.currentTarget.value);
  };
}

export default Input;
