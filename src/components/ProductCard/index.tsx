import React from 'react';
import * as styles from './index.module.scss';
import { Product } from '../../types/Products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const badgeClass = product.color.toLowerCase();

  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img src={product.images} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p>{product.tag_line}</p>
        <div className={styles.colorAndOriginRow}>
          <div className={`${styles.colorBadge} ${styles[badgeClass]}`}></div>
          <p className={styles.origin}>{product.origin}</p>
        </div>

        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
