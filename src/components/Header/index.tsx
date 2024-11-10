import React from 'react';

import Countdown from '../Countdown';
import * as styles from './index.module.scss';
import logo from '../../images/logo.svg';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="Firstleaf" className={styles.logo} />
        <div className={styles.checkoutContainer}>
          <Countdown seconds={300} />
          <Button type="button">Checkout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
