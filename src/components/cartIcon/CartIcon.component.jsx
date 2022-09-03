import './CartIcon.styles.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { BiTrash } from 'react-icons/bi';
import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/Cart.context';

const CartIcon = () => {
  const { cartItems, deleteItemFromCart, itemsCount, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const handleOnDelete = (toDeleteId) => deleteItemFromCart(toDeleteId);

  return (
    <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingBag className="cart-icon__svg" />
      <span className="cart-icon__count">{itemsCount} </span>
      {isCartOpen && (
        <div className="cart-icon__list">
          {!cartItems.length ? (
            <h2 className="cart-icon__empty">cart empty</h2>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-icon__item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-icon__item-img"
                />
                <div className="cart-icon__item-info">
                  <span>{item.name}</span>
                  <span>
                    {item.count} X ${item.price}
                  </span>
                </div>
                <button onClick={() => handleOnDelete(item.id)} className="btn__icon">
                  <BiTrash fill='red' />
                </button>
              </div>
            ))
          )}
          <Link to="/checkout" className="nav__link btn__checkout">
            checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
