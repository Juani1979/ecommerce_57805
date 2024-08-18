import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Container, Card } from "react-bootstrap";
import { CartContext } from "../cartcontext/CartContext";
import ItemCount from "../itemcount/ItemCount.jsx";
import "./ItemDetailsContainer.css";
import cargando from "../../assets/cargando.gif";

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const db = getFirestore();
    const refDoc = doc(db, "items", id);

    getDoc(refDoc)
      .then((snapshot) => {
        const data = snapshot.data();
        if (data) {
          setProduct({ id: snapshot.id, ...data });
          if (data.stock === 0) {
            setQuantity(0);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && quantity <= product.stock && quantity > 0) {
      addToCart({ ...product, quantity });
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={cargando} className="loading-image" alt="Cargando" />
      </div>
    );
  }

  return (
    <Container className="item-details-container">
      <div className="product-details">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <Card.Text className="detalle-producto">
            Descripción del Producto
          </Card.Text>
          <h1>{product.title}</h1>
          <Card.Text className="descripcion">{product.description}</Card.Text>
          <Card.Text className="precio-card">
            {formatPrice(product.price)}
          </Card.Text>
        </div>
        <div className="button-container">
          <ItemCount
            quantity={quantity}
            stock={product.stock}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </Container>
  );
};

export default ItemDetailsContainer;
