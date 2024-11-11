import React, { useEffect, useState } from 'react';

import * as styles from './index.module.scss';
import Countdown from '../Countdown';

interface BucketProps {
  batchSize: number;
  onBatchFull: (batchSize: number) => void;
  disabled?: boolean;
}

const Bucket = ({ batchSize, onBatchFull, ...rest }: BucketProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 1 && count % batchSize === 0) onBatchFull(batchSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, batchSize]);

  const updateCount = () => setCount((prev) => prev + 1);

  return (
    <button type="button" onClick={updateCount} className={styles.button} {...rest}>
      {count} glasses poured
    </button>
  );
};

const TheBucket = (): JSX.Element => {
  const [batchCount, setBatchCount] = useState(0);
  const [timeIsUp, setTimeIsUp] = useState(false);

  const handleFullBatch = () => {
    setBatchCount(batchCount + 1);
  };

  return (
    <>
      {timeIsUp && <h1>Total {batchCount}</h1>}
      {!timeIsUp && !!batchCount && (
        <Countdown
          key={new Date().toISOString()}
          seconds={5}
          label=""
          onFinish={() => setTimeIsUp(true)}
        />
      )}
      <Bucket onBatchFull={handleFullBatch} batchSize={3} disabled={timeIsUp} />
    </>
  );
};

export default TheBucket;
