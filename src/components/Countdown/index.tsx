import React, { useEffect, useState } from 'react';

import * as styles from './index.module.scss';

interface CountdownProps {
  seconds: number;
  label?: string;
  shouldRestartAtZero?: boolean;
  customClass?: string;
  onFinish?: () => void;
}

const Countdown = ({
  seconds: initialSeconds,
  label = 'Reserving your wines for',
  shouldRestartAtZero = false,
  customClass = '',
  onFinish = () => {}
}: CountdownProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        const end = shouldRestartAtZero ? initialSeconds : 0;
        const remaining = prevSeconds > 0 ? prevSeconds - 1 : end;
        return remaining;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [shouldRestartAtZero, initialSeconds]);

  useEffect(() => {
    if (seconds === 0) onFinish();
  }, [seconds, onFinish]);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const formatTimeUnit = (unit: number): string => `0${unit}`.slice(-2);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const counter = `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(remainingSeconds)}`;

  return (
    <div className={`${styles.countdown} ${customClass}`}>
      {label && <div className={`${styles.label} countdown-label`}>{label}</div>}
      <div className={`${styles.counter} countdown-counter`}>{counter}</div>
    </div>
  );
};

export default Countdown;
