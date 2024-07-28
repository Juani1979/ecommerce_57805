import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ItemListContainer } from "./components/itemlistcontainer/ItemListContainer";
import { ItemDetailsContainer } from "./components/itemdetailscontainer/ItemDetailsContainer";

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailsContainer />} />
          <Route path="/contact" element={<h1>Contacto</h1>} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
