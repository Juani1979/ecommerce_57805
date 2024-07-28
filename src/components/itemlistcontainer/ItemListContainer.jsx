import React from "react";
import "./ItemListContainer.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { Message } from "../../components/itemlistcontainer/Message";
import data from "../../data/products.json";
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
  const [filteredCategoryId, setFilteredCategoryId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate a delay in loading data
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(data), 2000)
        );
        const sortedProducts = response.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (!categoryId) {
          setProducts(sortedProducts);
          setFilteredCategoryId("TODOS LOS PRODUCTOS");
        } else {
          const itemsFilter = sortedProducts.filter(
            (i) => i.categoryId === categoryId
          );
          setProducts(itemsFilter);
          setFilteredCategoryId(categoryId);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        {filteredCategoryId && (
          <h2 className="filtered-category-id">
            {filteredCategoryId.toUpperCase()}
          </h2>
        )}
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.img}
                alt={product.name}
                className="card-img"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Categoría: {product.categoryId}</Card.Text>
                <Card.Text className="precio">
                  {formatCurrency(product.price)}
                </Card.Text>
                <Link to={`/item/${product.id}`}>
                  <Button variant="primary">Ver Descripción</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
