import React from 'react';
import { Categories } from '../components';


const HomePage = ({ clotheCategories }) => {

  return (
    <div className="page-container">
      <Categories clotheCategories={clotheCategories} />
    </div>
  );
};

export default HomePage;
