import React, { useState } from 'react';
import BuscadorProductos from './BuscadorProductos/BuscadorProductos';
import Categorias from './Categorias/Categorias';
import ListaProductos from './ListaProductos/ListaProductos';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);    
  };

  return (
    <>
      <BuscadorProductos onSelectedCategoriesChange={handleSelectedCategoriesChange} />
      <Categorias />
      <ListaProductos selectedCategories={selectedCategories} />
    </>
  );
};

export default Home;
