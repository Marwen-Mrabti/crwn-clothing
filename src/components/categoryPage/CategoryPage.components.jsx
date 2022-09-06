import './CategoryPage.styles.scss';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/Categories.context';
import ProductCard from '../shared/productCard/ProductCard.shared';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    categoriesMap[category] && setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <div className="category__container">
      <h1 className="category__title">{category} </h1>
      {!products.length ? (
        <h1 style={{ alignText: 'center', fontSize: '8rem' }}>loading</h1>
      ) : (
        <div className="category__products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
