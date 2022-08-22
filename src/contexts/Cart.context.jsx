import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  itemsCount: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  setCartItems: () => {},
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (product) => {
    const cartIds = cartItems.map((item) => item.id);

    if (!cartIds.includes(product.id)) {
      setCartItems((prev) => [...prev, { ...product, count: 1 }]);
    } else {
      setCartItems(() =>
        cartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  const deleteItemFromCart = (toDeleteId) => {
    setCartItems(cartItems.filter((item) => item.id !== toDeleteId));
  };

  useEffect(() => {
    setItemsCount(
      cartItems
        .map((item) => item.count)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    );

    setTotalAmount(
      cartItems
        .map((item) => item.count * item.price)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    );
  }, [cartItems]);

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
    deleteItemFromCart,
    itemsCount,
    isCartOpen,
    setIsCartOpen,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
