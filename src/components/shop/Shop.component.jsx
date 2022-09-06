import './Shop.styles.scss';
import React, { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/Categories.context';
import CategoryPreview from '../categoryPreview/CategoryPreview.component';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const isEmpty = Object.keys(categoriesMap).length === 0;

  return (
    <div className="shop">
      {isEmpty ? (
        <h1 style={{ alignText: 'center', fontSize: '8rem' }}>loading</h1>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />;
        })
      )}
    </div>
  );
};

export default Shop;
