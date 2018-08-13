import * as React from 'react';

import styles from './Button.module.sass';

interface IProps {
  label?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: any) => void;
}

class Button extends React.Component<IProps, {}> {
  public render() {
    const { label, loading, className, children, ...props } = this.props;

    return (
      <button
        className={`${className ? className : styles.button} ${
          loading ? styles.loading : ''
        }`}
        {...props}
      >
        {label || children}
      </button>
    );
  }
}

export default Button;
