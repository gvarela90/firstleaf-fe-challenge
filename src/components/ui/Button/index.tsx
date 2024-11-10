import React, { ButtonHTMLAttributes } from 'react';

import * as styles from './index.module.scss';

const Button = ({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClasses = [styles.button, className].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
