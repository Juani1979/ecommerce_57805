import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContext } from "../cartcontext/CartContext";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./Checkout.css";

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");
    addDoc(orderCollection, order).then(({ id }) => {
      if (id) {
        alert("Tu pedido " + id + " fue realizado exitosamente!");
        clearCart();
        setBuyer(initialValues);
        setErrors({});
      }
    });
  };

  if (!cart.length) {
    return <h2>El carrito está vacío</h2>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container>
      <h1>Carrito</h1>
      {cart.map((item) => (
        <Card key={item.id} className="mb-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={item.image} alt={item.title} className="imgCheckout" />
              <div>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="mb-0">
                  Cantidad: {item.quantity}
                </Card.Text>
                <Card.Text>Precio Unit. {formatPrice(item.price)}</Card.Text>
              </div>
            </div>
            <a
              variant="link"
              className="botonBorrar"
              onClick={() => removeFromCart(item.id)}
            >
              <FaTrash size={18} />
            </a>
          </div>
        </Card>
      ))}
      <h4>Total: {formatPrice(totalPrice)} </h4>
      <Button variant="danger" onClick={clearCart}>
        Resetear Carrito
      </Button>
      <Link to="/">
        <Button variant="primary">Seguir Comprando</Button>
      </Link>
      <hr />
      <form>
        <div>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Ingrese su nombre"
            value={buyer.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Ingrese su email"
            value={buyer.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Teléfono: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            placeholder="Ingrese su teléfono"
            value={buyer.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <button type="button" onClick={handleOrder}>
          Comprar
        </button>
      </form>
    </Container>
  );
};

export default Cart;
