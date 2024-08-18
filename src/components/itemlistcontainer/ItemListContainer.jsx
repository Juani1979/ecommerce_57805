import React, { useState, useEffect } from "react";
import "./ItemListContainer.css";
import { Link, useParams } from "react-router-dom";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import { Container, Card, Button } from "react-bootstrap";
import { Message } from "../../components/itemlistcontainer/Message";
import cargando from "../../assets/cargando.gif";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const db = getFirestore();
    const refCollections = !categoryId
      ? collection(db, "items")
      : query(collection(db, "items"), where("categoryId", "==", categoryId));

    getDocs(refCollections)
      .then((snapshot) => {
        const allItems = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        const sortedItems = allItems.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setProducts(sortedItems);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={cargando} className="loading-image" alt="Cargando" />
      </div>
    );
  }

  return (
    <Container fluid className="contenedor">
      <Message
        greeting="¡Las mejores bebidas están en Drink Shop!"
        greeting1="Deliciosas opciones para cada ocasión."
      />
      <div className="row item-list-container">
        <h1 className="titulo">Productos</h1>
        {!categoryId && (
          <h2 className="tituloCategoria">TODOS LOS PRODUCTOS</h2>
        )}
        {categoryId && (
          <h2 className="tituloCategoria">{categoryId.toUpperCase()}</h2>
        )}
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <Link to={`/item/${product.id}`} className="card-link">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title className="tituloProd">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="descripcion">
                    {product.description}
                  </Card.Text>
                  <Card.Text className="precio">
                    {formatCurrency(product.price)}
                  </Card.Text>
                  <Button variant="primary">Ver Descripción</Button>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};
