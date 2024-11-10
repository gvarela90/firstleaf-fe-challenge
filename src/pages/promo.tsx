import React, { useState } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import ProductColorFilter from '../components/ProductColorFilter';

const Promo = (): JSX.Element => {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <>
      <Header />
      <ProductColorFilter selectedColor={selectedColor} onColorChange={setSelectedColor} />
      <ProductGrid selectedColor={selectedColor} />
    </>
  );
};

export default Promo;
