import React from 'react';
import './CartWidget.css';
import cartImage from '../assets/cart.png';

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <img src={cartImage} alt="Cart" className="cart-icon" />
      <span className="cart-notification">5</span>
    </div>
  );
};

export default CartWidget;
