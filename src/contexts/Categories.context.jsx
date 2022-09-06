import { useEffect } from 'react';
import { useState, createContext } from 'react';
// import { SHOP_DATA } from '../shop.data';
import { getCatagoriesAndDocuments } from '../utils/firebase/firebase.config';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCatagoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);
  
  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider displayName="ProductContext" value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
