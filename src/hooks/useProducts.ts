import { useQuery } from 'react-query';
import { Product } from '../types/Products';

export function useProducts() { 
  const { data, isLoading } = useQuery('products', async () => {
    const products =  await fetch('https://my-json-server.typicode.com/YofretRios/jsondetails/products')
      .then(res => res.json()) as Array<Product>;

    window.localStorage.setItem('products', JSON.stringify(products));
    
    return products;
  }, { initialData: [] });

  return { data, isLoading };
}

export default { useProducts };