import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from './AppState';

// import styles from './Input.module.sass';

@observer
class Input extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return <input onChange={this.onChange} type="text" value={this.props.appState.input} />;
  }


  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.appState.setInput(e.currentTarget.value);
  }
}

export default Input;
