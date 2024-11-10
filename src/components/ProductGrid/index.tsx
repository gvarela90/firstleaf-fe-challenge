import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard';
import * as styles from './index.module.scss';

const ProductGrid = ({ selectedColor }) => {
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
      <div className={styles.grid}>
        {filteredProducts?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductGrid;
