import './ProductCard.styles.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../../contexts/Cart.context';

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const handleOnAddToCart = () => addItemToCart(product);

  return (
    <div className="product__card">
      <img src={imageUrl} alt={name} className="product__img" />
      <div className="product__info">
        <span className="product__info-name">{name} </span>
        <span className="product__info-price">${price} </span>
      </div>
      <button className="btn product__cta-btn" onClick={handleOnAddToCart}>
        add to cart
      </button>
    </div>
  );
};

export default ProductCard;
