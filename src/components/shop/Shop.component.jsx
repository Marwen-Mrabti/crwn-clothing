import './Shop.styles.scss';
import React, { useContext } from 'react';

import { ProductsContext } from '../../contexts/Products.context';
import ProductCard from '../shared/productCard/ProductCard.shared';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="shop">
      {!products.length ? (
        <h1>loading</h1>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
};

export default Shop;
