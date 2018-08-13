import * as React from 'react';

import AppState from '../app-state';
import Info from '../info';

class Summary extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <Info>
        <h3>Done!</h3>
        <p>You got.</p>
      </Info>
    );
  }
}

export default Summary;
