import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// initialize cart context
export const CartContext = createContext({
  cartItems: [],
  itemsCount: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  setCartItems: () => {},
  decrementItemQuantity: () => {},
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /************** add item to cart ******************** */
  const addItemToCart = (product) => {
    const cartIds = cartItems.map((item) => item.id);
    if (!cartIds.includes(product.id)) {
      return setCartItems((prev) => [...prev, { ...product, count: 1 }]);
    } else {
      setCartItems(() =>
        cartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  /************** delete item from cart ******************** */
  const deleteItemFromCart = (toDeleteId) => {
    setCartItems(cartItems.filter((item) => item.id !== toDeleteId));
  };

  /************* decrement item quantity ******************** */
  const decrementItemQuantity = (product) => {
    const cartIds = cartItems.map((item) => item.id);
    if (!cartIds.includes(product.id)) {
      return;
    } else if (product.count <= 1) {
      deleteItemFromCart(product.id);
    } else {
      setCartItems(() =>
        cartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count - 1 } : item
        )
      );
      /******** IF CART EMPTY NAVIGATE TO SHOP  ********* */
      !cartItems.length && navigate('/shop');
    }
  };

  /********* total price  *************/
  useEffect(() => {
    setItemsCount(
      cartItems
        .map((item) => item.count)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );

    setTotalAmount(
      cartItems
        .map((item) => item.count * item.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
  }, [cartItems]);

  const value = {
    cartItems,
    setCartItems,
    addItemToCart,
    decrementItemQuantity,
    deleteItemFromCart,
    itemsCount,
    isCartOpen,
    setIsCartOpen,
    totalAmount,
  };

  return (
    <CartContext.Provider displayName="CartContext" value={value}>
      {children}
    </CartContext.Provider>
  );
};
