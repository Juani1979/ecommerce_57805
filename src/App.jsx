import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="¡Las mejores bebidas en Drink Shop!" greeting1="Deliciosas opciones para cada ocasión." />
    </>
  );
}

export default App;