import React, { useState, useEffect } from 'react';

import { IoIosArrowDropdown } from 'react-icons/io';
import imagenChica from '../../../../../assets/home/imagen_home_mujer.svg';
import './BuscadorProductos.css';


const BuscadorProductos = ({ onSelectedCategoriesChange }) => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  

  useEffect(() => {
    // Llamada a la API para obtener las categorías
    fetch('http://localhost:8081/api/admin/list')
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos obtenidos para que coincidan con la estructura de state 'categories'
        const mappedCategories = data.map((item) => ({
          id: item.name,
          label: item.name,
          checked: false,
        }));
        setCategories(mappedCategories);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, [modalOpen]);

  const handleCheckboxChange = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, checked: !category.checked } : category
      )
    );

    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(id)
        ? prevSelectedCategories.filter((category) => category !== id)
        : [...prevSelectedCategories, id]
    );
  };

  useEffect(() => {
    onSelectedCategoriesChange(selectedCategories);    
  }, [selectedCategories, onSelectedCategoriesChange]);

  

  return (
    <div className="container-principal-buscador-productos">
      <div className="container-lema-buscador-productos">
        <p>Busca el instrumento que deseas rentar al mejor precio</p>
      </div>
      <div className="container-buscador-productos-inputs">
        <div>
          <input className="input-buscador-productos" type="text" placeholder="Guitarra electrica acustica..." />
        </div>
        <div>
          fechas
        </div>
        <button className="dropdown-buscador-productos" onClick={() => setModalOpen(true)}>
          Categoría <IoIosArrowDropdown className="icnn-drop-down" />
        </button>
        <div className="container-boton-buscador-productos">
          <button className="boton-buscar-buscador-productos">Realizar Busqueda</button>
        </div>
      </div>
      <div className="container-imagen-buscador-productos-chica">
        <img className="imagen-buscador-productos-chica" src={imagenChica} alt="" />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-buscador-productos">
          <div className="modal-content-categorias">
            <span className="close-modal-buscador-productos" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <div className="checkbox-container-buscador-productos">
              {categories.map((category) => (
                <div key={category.id} className="checkbox-item-buscador-productos">
                  <input
                    type="checkbox"
                    className="checkbox-buscador-productos"
                    checked={category.checked}
                    onChange={() => handleCheckboxChange(category.id)}
                  />
                  {category.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscadorProductos;
