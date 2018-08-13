import * as React from 'react';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import AppState from '../app-state';
import Form from '../form';

import styles from './Activity.module.sass';

@observer
class Activity extends React.Component<{ appState: AppState }, {}> {
  public render() {
    return (
      <div className={styles.activity}>
        <DevTools />
        <Form appState={this.props.appState} />
      </div>
    );
  }
}

export default Activity;
