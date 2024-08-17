import React, { useContext } from "react";
import { CartContext } from "../cartcontext/CartContext";
import "./CartWidget.css";
import cartImage from "../../assets/cart.png";

const CartWidget = () => {
  const { cart } = useContext(CartContext);

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => {
      const itemQuantity = Number(item.quantity) || 0;
      return total + itemQuantity;
    }, 0);
  };

  return (
    <div className="cart-widget">
      <img src={cartImage} alt="Cart" className="cart-icon" />
      <span className="cart-notification">{getTotalQuantity()}</span>
    </div>
  );
};

export default CartWidget;
