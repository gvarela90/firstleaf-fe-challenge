import React from 'react'
import { useProducts } from '../../hooks/useProducts';

const ProductGrid = () => {
  const { data } = useProducts();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data?.map(product => <li>{product.name}</li>)}
    </ul>
  )
}

export default ProductGrid;
