import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Button from '../button';

import styles from './Actions.module.sass';

@observer
class Actions extends React.Component<{ appState: AppState }, {}> {
  public render() {
    const { appState } = this.props;

    return (
      <div className={styles.actions}>
        <div>
          {appState.index + 1}/{AppState.MAX_STEPS}
        </div>
        {appState.checked ? (
          <Button
            label={appState.atLastStep ? 'Finish' : 'Next'}
            onClick={this.onNext}
            disabled={!appState.ready}
            loading={!appState.ready}
          />
        ) : (
          <Button
            label="Check"
            type="submit"
            disabled={!appState.readyToCheck}
          />
        )}
      </div>
    );
  }

  private onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.props.appState.next();
  };
}

export default Actions;
