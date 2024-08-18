import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./ItemCount.css";

const ItemCount = ({
  quantity,
  stock,
  handleIncrease,
  handleDecrease,
  handleAddToCart,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCartWithModal = () => {
    handleAddToCart();
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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
          className="custom-button-add"
          onClick={handleAddToCartWithModal}
          disabled={quantity > stock}
        >
          Agregar al carrito
        </Button>
        <Link to="/">
          <Button className="custom-button">Regresar</Button>
        </Link>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto Agregado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El Producto se ha agregado al carrito.</Modal.Body>
        <Modal.Footer>
          <Link to="/cart">
            <Button variant="secondary" onClick={handleCloseModal}>
              Ir al carrito
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" onClick={handleCloseModal}>
              Seguir Comprando
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemCount;
