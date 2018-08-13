import * as React from 'react';

import { observer } from 'mobx-react';
import { CSSTransition } from 'react-transition-group';

import Activity from '../activity';
import AppState from '../app-state';
import Summary from '../summary';
import Welcome from '../welcome';

import styles from './Lesson.module.sass';

@observer
class Lesson extends React.Component<{ appState: AppState }, {}> {
  public render() {
    const { appState } = this.props;

    return (
      <CSSTransition
        in={appState.transitioning}
        classNames="transition"
        timeout={1000}
      >
        <div key={appState.index} className={styles.lesson}>
          {this.currentStep()}
        </div>
      </CSSTransition>
    );
  }

  private currentStep() {
    const { appState } = this.props;

    switch (appState.index) {
      case -1:
        return <Welcome appState={appState} />;
      case AppState.STEPS_COUNT:
        return <Summary appState={appState} />;
      default:
        return <Activity appState={appState} />;
    }
  }
}

export default Lesson;
