import React from "react";
import "./ItemListContainer.css";
import { Container } from "react-bootstrap";

export const Message = ({ greeting, greeting1 }) => {
  return (
    <Container>
      <div className="item-list-container">
        <h1>{greeting}</h1>
        <h2>{greeting1}</h2>
      </div>
    </Container>
  );
};
