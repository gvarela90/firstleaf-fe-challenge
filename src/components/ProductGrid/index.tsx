import React from 'react';

import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard';
import * as styles from './index.module.scss';

interface ProductGridProps {
  selectedColor: string | null;
}

const ProductGrid = ({ selectedColor }: ProductGridProps) => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (error)
    return (
      <div className={styles.error}>
        There was an error retrieving the data. Please try again later.
      </div>
    );

  const filteredProducts = selectedColor
    ? data?.filter((product) => product.color === selectedColor)
    : data;

  return (
    <div className={styles.container}>
      <div className={styles.grid} role="list">
        {filteredProducts?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductGrid;
