import * as React from 'react';

import { observer } from 'mobx-react';
import 'whatwg-fetch';

import AppState from '../app-state';
import Lesson from './Lesson';

@observer
class LessonContainer extends React.Component<{ appState: AppState }, {}> {
  public componentDidMount() {
    this.fetchTerm();
  }

  public componentDidUpdate(
    prevProps: { appState: AppState },
    prevState: any,
    snapshot: any
  ) {
    if (this.props.appState.checked) {
      this.fetchTerm();
    }
  }

  public render() {
    const { appState } = this.props;

    return <Lesson appState={appState} data-checked={appState.checked} />;
  }

  private fetchTerm() {
    const { appState } = this.props;

    appState.setLoading(true);

    fetch('api/v1/activities')
      .then(response => response.json())
      .then(responseJson => {
        appState.setNextTerm(responseJson.data.attributes.term);
        appState.setLoading(false);
      })
      .catch(e => {
        appState.setLoading(false);
      });
  }
}

export default LessonContainer;
