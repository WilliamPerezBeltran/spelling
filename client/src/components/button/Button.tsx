import * as React from 'react';

import styles from './Button.module.sass';

interface IProps {
  label: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
}

class Button extends React.Component<IProps, {}> {
  public render() {
    return (
      <button className={styles.button} {...this.props}>
        {this.props.label}
      </button>
    );
  }
}

export default Button;
