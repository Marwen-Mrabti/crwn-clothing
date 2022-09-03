import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { CheckoutPage, Home, Shop, SignIn, SignUp } from './pages';

const App = () => {
  const CATEGORIES = [
    {
      id: 1,
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    },
    {
      id: 2,
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
    {
      id: 3,
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      id: 4,
      title: 'womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      id: 5,
      title: 'mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    },
  ];

  return (
    <div className="app__wrapper">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route index element={<Home clotheCategories={CATEGORIES} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
