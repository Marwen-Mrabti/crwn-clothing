import React from 'react';
import './Categories.styles.scss';

import Category from './categoryCard/CategoryCard';

const Categories = ({ clotheCategories }) => {
  return (
    <div className="categories-container ">
      {clotheCategories.map((category, index) => (
        <Category key={category.id} clotheCategory={category} />
      ))}
    </div>
  );
};

export default Categories;
