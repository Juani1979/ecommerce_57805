import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/cartcontext/CartContext";
import { ItemListContainer } from "./components/itemlistcontainer/ItemListContainer";
import { ItemDetailsContainer } from "./components/itemdetailscontainer/ItemDetailsContainer";
import { Cart } from "./components/checkout/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />
            <Route path="/item/:id" element={<ItemDetailsContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<h1>Contacto</h1>} />
            <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
        </>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
