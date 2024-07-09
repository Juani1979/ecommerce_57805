import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <>
      <div className="background-image">
        <NavBar />
        <ItemListContainer greeting="¡Las mejores bebidas estan en Drink Shop!" greeting1="Deliciosas opciones para cada ocasión." />
      </div>
    </>
  );
}

export default App;