import './CategoryPreview.styles.scss';
import React from 'react';
import ProductCard from '../shared/productCard/ProductCard.shared';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container ">
      <h2 className="title">
        <Link to={`/shop/${title}`} className="title__link">
          <span>{title}&rarr;</span>
        </Link>
      </h2>

      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
