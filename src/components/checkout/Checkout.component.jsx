import './Checkout.styles.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import CheckoutItemCard from './checkoutItemCard/CheckoutItemCard';

const Checkout = () => {
  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <div className="checkout__container">
      {cartItems.map((item) => (
        <CheckoutItemCard key={item.id} item={item} />
      ))}
      <div className="checkout__total-price">
        <h2> the total amount is :{totalAmount}$ </h2>
      </div>
    </div>
  );
};

export default Checkout;
