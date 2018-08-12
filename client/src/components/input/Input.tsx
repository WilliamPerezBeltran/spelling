import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';

import styles from './Input.module.sass';

interface IProps {
  appState: AppState;
}

@observer
class Input extends React.Component<IProps, {}> {
  private fields: HTMLInputElement[] = [];

  public componentDidMount() {
    this.fields[this.props.appState.focusIndex].focus();
  }

  public componentDidUpdate(prevProps: IProps, prevState: any, snapshot: any) {
    this.fields[this.props.appState.focusIndex].focus();
  }

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
        ref={ref => (this.fields[index] = ref as HTMLInputElement)}
      />
    ));
  }

  private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = parseInt(e.currentTarget.dataset.index || '', 10);
    const elements = this.fields;

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
    const allowed = ['Enter', ...this.props.appState.term.available];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const index = parseInt(e.currentTarget.dataset.index || '', 10);

    this.props.appState.setInput(index, target.value);
  };
}

export default Input;
