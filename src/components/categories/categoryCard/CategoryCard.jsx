import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.styles.scss';

const CategoryCard = ({ clotheCategory }) => {
  const { title, imageUrl } = clotheCategory;

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(
            ${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <Link to={`/shop/${title}`}>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
