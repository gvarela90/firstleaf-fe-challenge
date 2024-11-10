import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard';
import * as styles from './index.module.scss';

const ProductGrid = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (error)
    return (
      <div className={styles.error}>
        There was an error retrieving the data. Please try again later.
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {data?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductGrid;
