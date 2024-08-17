import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ItemCount.css";

const ItemCount = ({
  quantity,
  stock,
  handleIncrease,
  handleDecrease,
  handleAddToCart,
}) => {
  return (
    <div>
      <div className="quantity-controls">
        <Button className="quantity-boton" onClick={handleDecrease}>
          -
        </Button>
        <span className="quantity">{quantity}</span>
        <Button className="quantity-boton" onClick={handleIncrease}>
          +
        </Button>
      </div>
      <p className="quantity-disponibles">{stock} disponibles</p>

      <div className="button-container">
        <Button
          variant="success"
          className="custom-button"
          onClick={handleAddToCart}
          disabled={quantity > stock}
        >
          Agregar al carrito
        </Button>
        <Link to="/">
          <Button variant="primary" className="custom-button">
            Regresar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCount;
