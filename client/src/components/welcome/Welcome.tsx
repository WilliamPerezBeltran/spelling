import * as React from 'react';

import { observer } from 'mobx-react';

import AppState from '../app-state';
import Button from '../button';
import Info from '../info';

@observer
class Welcome extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <Info>
        <h3>Welcome!</h3>
        <p>Start studying.</p>
        <Button
          onClick={this.onNext}
          label="Let’s do this"
          disabled={!this.props.appState.ready}
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
