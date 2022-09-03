import './CheckoutItemCard.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../../contexts/Cart.context';
import { BiTrash } from 'react-icons/bi';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const CheckoutItemCard = ({ item }) => {
  const { deleteItemFromCart, addItemToCart, decrementItemQuantity } =
    useContext(CartContext);

  //handlers
  const handleOnDelete = (toDeleteId) => deleteItemFromCart(toDeleteId);
  const handleOnIncrementQuantity = () => addItemToCart(item);
  const handleOnDecrementQuantity = () => decrementItemQuantity(item);

  return (
    <div className="checkoutItem">
      <div className="checkoutItem__img">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="checkoutItem__content">
        <h3>
          <span>name : </span> {item.name}
        </h3>
        <h3>
          <span>unit price : </span> {item.price} $
        </h3>
        <h3 className="quantity">
          <span>quantity : </span>
          <button onClick={handleOnDecrementQuantity} className="btn__icon">
            <AiOutlineMinusCircle fill="orangered" />
          </button>
          {item.count}
          <button onClick={handleOnIncrementQuantity} className="btn__icon">
            <AiOutlinePlusCircle fill="blue" />
          </button>
        </h3>
        <button
          onClick={() => handleOnDelete(item.id)}
          className="btn__icon btn__icon-delete"
        >
          <BiTrash fill="red" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutItemCard;
