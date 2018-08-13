import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Button from '../button';
import Info from '../info';

import styles from '../info/Info.module.sass';

@observer
class Welcome extends React.Component<{ appState: AppState }, {}> {
  public render() {
    const { appState } = this.props;

    return (
      <Info>
        <h3>Welcome!</h3>
        <p className={styles.infoParagraph}>
          You are going to listen to a few english words that you’ll have to
          spell. Have fun!
        </p>
        <Button
          onClick={this.onNext}
          label="Let’s do this"
          disabled={!appState.ready}
          loading={!appState.ready}
        />
      </Info>
    );
  }

  private onNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    this.props.appState.next();
  };
}

export default Welcome;
