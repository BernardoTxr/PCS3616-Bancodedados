import React from 'react';
import ItemsList from './ItemsList';
import AddProductForm from './AddProductForm';
import DeleteProduct from './DeleteProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Gestão de Produtos</h1>
      <AddProductForm />
      <DeleteProduct />
      <ItemsList />
    </div>
  );
}

export default App;
