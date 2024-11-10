import React, { ButtonHTMLAttributes } from 'react';

import * as styles from './index.module.scss';

type ButtonVariant = 'primary' | 'outlined';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

const Button = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonClasses = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
