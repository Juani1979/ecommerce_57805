import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import "./ItemDetailsContainer.css";

import data from "../../data/products.json";
import cargando from "../../assets/cargando.gif";

export const ItemDetailsContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 1000);
    });

    myPromise
      .then((response) => {
        const item = response.find((i) => i.id === Number(id));
        setProduct(item);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={cargando} className="loading-image" alt="Cargando" />
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container className="item-details-container">
      <div className="product-details">
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="product-info">
          <Card.Text className="detalle-producto">
            Descripción del Producto
          </Card.Text>
          <h1>{product.name}</h1>
          <Card.Text className="descripcion">{product.description}</Card.Text>
          <Card.Text className="precio">{formatPrice(product.price)}</Card.Text>
          <div className="button-container">
            <Link to="/">
              <Button variant="primary" className="custom-button">
                Regresar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};
