import React from 'react';
import Button from '../ui/Button';
import * as styles from './index.module.scss';

type ProductColorFilterProps = {
  selectedColor: string | null;
  onColorChange: (color: string | null) => void;
};

const ProductColorFilter = ({ selectedColor, onColorChange }: ProductColorFilterProps) => {
  return (
    <div className={styles.container}>
      <Button
        variant={selectedColor === null ? 'primary' : 'outlined'}
        onClick={() => onColorChange(null)}
      >
        All
      </Button>
      <Button
        variant={selectedColor === 'Red' ? 'primary' : 'outlined'}
        onClick={() => onColorChange('Red')}
      >
        Red Wine
      </Button>
      <Button
        variant={selectedColor === 'White' ? 'primary' : 'outlined'}
        onClick={() => onColorChange('White')}
      >
        White Wine
      </Button>
    </div>
  );
};

export default ProductColorFilter;
