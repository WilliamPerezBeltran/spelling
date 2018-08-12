import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Audio from '../audio';

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
    const { appState } = this.props;

    return appState.term.chars.map((char, index) => (
      <span
        key={`${index}-${char}`}
        data-char={char}
        className={this.className(
          char,
          appState.inputArray[index],
          'container'
        )}
      >
        <input
          onKeyDown={this.onKeyDown}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          type="text"
          value={appState.inputArray[index] || ''}
          maxLength={1}
          readOnly={appState.checked}
          className={this.className(char, appState.inputArray[index], 'input')}
          data-index={index}
          ref={ref => (this.fields[index] = ref as HTMLInputElement)}
        />
      </span>
    ));
  }

  private className(char: string, input: string, baseClass: string) {
    const className = styles[baseClass];

    if (!this.props.appState.checked) {
      return className;
    }

    return className.concat(
      ` ${
        char === input
          ? styles[baseClass + 'Success']
          : styles[baseClass + 'Error']
      }`
    );
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

    if (e.which === 8 || e.which === 46) {
      Audio.tap();
    }
  };

  private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Enter', ...this.props.appState.term.available];

    if (!allowed.includes(e.key)) {
      e.preventDefault();
      return;
    }

    Audio.tap();
  };

  private onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const index = parseInt(e.currentTarget.dataset.index || '', 10);

    this.props.appState.setInput(index, target.value);
  };
}

export default Input;
