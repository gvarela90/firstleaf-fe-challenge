import React from "react";
import Countdown from "../components/Countdown";
import ProductGrid from "../components/ProductGrid";

const Counter = (): JSX.Element => (
  <>
    <header>
      <Countdown seconds={300} />
    </header>
    
    <ProductGrid />
  </>
);

export default Counter;
