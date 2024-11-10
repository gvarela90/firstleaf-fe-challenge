import React from 'react';
import * as styles from './index.module.scss';
import { Product } from '../../types/Products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img src={product.images} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p>{product.tag_line}</p>
        <p className={styles.origin}>{product.origin}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
