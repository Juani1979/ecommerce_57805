import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContext } from "../cartcontext/CartContext";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import logoImage from "../../assets/logo_drinkshop.png";
import "./Checkout.css";

const initialValues = {
  name: "",
  email: "",
  confirmEmail: "",
  phone: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleChange = (ev) => {
    setBuyer((prev) => {
      return { ...prev, [ev.target.name]: ev.target.value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!buyer.name) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!buyer.email) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(buyer.email)) {
      newErrors.email = "El email no es válido.";
    }
    if (!buyer.confirmEmail) {
      newErrors.confirmEmail = "La confirmación del email es obligatoria.";
    } else if (buyer.email !== buyer.confirmEmail) {
      newErrors.confirmEmail = "Los emails no coinciden.";
    }
    if (!buyer.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(buyer.phone)) {
      newErrors.phone = "El teléfono debe contener solo números.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validateForm()) {
      return;
    }

    const order = {
      buyer,
      cart,
      totalPrice,
      date: new Date().toISOString(),
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");
    addDoc(orderCollection, order).then(({ id }) => {
      if (id) {
        setOrderId(id);
        setFinalTotal(totalPrice);
        setOrderSuccess(true);
        clearCart();
        setBuyer(initialValues);
        setErrors({});
      }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemoveClick = (itemId) => {
    setItemToRemove(itemId);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
    }
    setShowModal(false);
  };

  const handleClearCartClick = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  if (orderSuccess) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-box">
          <img src={logoImage} alt="Logo Drinkshop" className="logo-mensaje" />
          <p className="empty-cart-title">¡Compra realizada con éxito!</p>
          <p className="empty-cart-subtitle">
            Tu pedido <strong>{orderId}</strong> fue procesado correctamente.
          </p>
          <p className="empty-cart-subtitle">
            Total: <strong>{formatPrice(finalTotal)}</strong>
            <br></br>Gracias por tu compra.
            <br></br>Pronto recibirás un correo con los detalles de tu pedido.
          </p>
          <Link to="/">
            <Button variant="primary" className="custom-button">
              Volver a la tienda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-box">
          <img src={logoImage} alt="Logo Drinkshop" className="logo-mensaje" />
          <p className="empty-cart-title">¡Comenzá a Comprar en Drink Shop!</p>
          <p className="empty-cart-subtitle">
            Sumá productos y conseguí beneficios extra.
          </p>
          <Link to="/">
            <Button variant="primary" className="custom-button">
              Descubrir Productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Container className="cart-container">
      <div className="cart-items">
        <h2>Tus Productos</h2>
        <hr className="separator" />
        {cart.map((item) => (
          <Card key={item.id} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="imgCheckout"
                />
                <div>
                  <Card.Title className="card-title">{item.title}</Card.Title>
                  <Card.Text className="card-description">
                    {item.description}
                  </Card.Text>
                  <Card.Text className="mb-0 card-quantity">
                    Cantidad: {item.quantity}
                  </Card.Text>
                  <Card.Text className="card-priceUnit">
                    Precio Unit. {formatPrice(item.price)}
                  </Card.Text>
                </div>
              </div>
              <a
                variant="link"
                className="botonBorrar"
                onClick={() => handleRemoveClick(item.id)}
                title="Eliminar Producto"
              >
                <FaTrash size={20} />
              </a>
            </div>
          </Card>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Resumen de la compra</h2>
        <hr className="separator" />

        <div className="summary-item">
          <p className="txtProductos">
            Productos <span>({totalItems})</span>
          </p>
          <p className="txtProductos">{formatPrice(totalPrice)}</p>
        </div>

        <div className="summary-item">
          <p className="txtProductos">Envío</p>
          <p className="txtProductos">Gratis</p>
        </div>

        <div className="summary-item">
          <p className="txtProductosTot">Total</p>
          <p className="txtProductosTot">{formatPrice(totalPrice)}</p>
        </div>

        <hr />
        <Button className="custom-button w-100" onClick={handleClearCartClick}>
          Vaciar Carrito
        </Button>
        <p className="separator1"></p>
        <Link to="/">
          <Button className="custom-button w-100">Seguir Comprando</Button>
        </Link>
        <p className="separator"></p>

        <h2>Formulario de compra</h2>
        <p className="txtForm">
          ¡Complete el siguiente formulario para finalizar su compra!
        </p>
        <hr className="separator" />
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ingrese su nombre"
              value={buyer.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Ingrese su email"
              value={buyer.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmEmail">
            <Form.Label>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              name="confirmEmail"
              placeholder="Confirme su email"
              value={buyer.confirmEmail}
              onChange={handleChange}
              isInvalid={!!errors.confirmEmail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmEmail}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Ingrese su teléfono"
              value={buyer.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <p className="separate"></p>
          <Button
            type="button"
            className="custom-button w-100"
            onClick={handleOrder}
          >
            Realizar Compra
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el producto del carrito?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmRemove}>
            Eliminar Producto
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Vaciar Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro que desea vaciar el carrito?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmClearCart}>
            Vaciar Carrito
          </Button>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
