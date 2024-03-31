import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../../../context/ApiContext";
import editIcon from '../../../../assets/admin/admin_product/botonEditar.svg';
import trashIcon from '../../../../assets/admin/admin_product/botonEliminar.svg';
import { ImPlus } from "react-icons/im";
import { Link } from "react-router-dom"; 
import './AdminProducts.css';
import { IoChevronBack } from "react-icons/io5";
import ImgTrash from "../../../../assets/admin/admin_product/trash.png";
const AdminProducts = () => {
  const { productos, loading, error, deleteProduct, createProduct, editProduct } = useApi();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDeleteClick = (id, name, images) => {
    setConfirmDelete({ id, name, images });
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      await deleteProduct(confirmDelete.id);
      setConfirmDelete(null);
    }
  };

  const CustomActionsCell = ({ id, name, images }) => (
    <div>
      <Link to={`/administracion/Productos/EditarProducto/${id}`} className="link-boton">
        <button className="icon-button edit" onClick={() => handleDeleteClick(id, name, images)}>
          <img src={editIcon} alt="Editar" />
        </button>
      </Link>
      <button className="icon-button eliminate" onClick={() => handleDeleteClick(id, name, images)}>
        <img src={trashIcon} alt="Eliminar" />
      </button>
    </div>  
  );

  const columns = [
    {
      name: 'Imagen',
      selector: (row) => row.images[0].imageData,
      cell: ({ images }) => (
        <div className="image-column">
          {images && images.length > 0 && (
            <img
              src={`data:image/jpeg;base64,${images[0].imageData}`}
              alt="Imagen"
              style={{ width: '50px' }}
            />
          )}
        </div>
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre del Instrumento",
      selector: (row) => row.name,
      sortable: true,
    },
    
    {
      name: "Categoría",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Acción',
      cell: CustomActionsCell,
    },
  ];

  return (
    <div className="table-container">
      <h1 className="text-admin-products">Administra, crea y elimina instrumentos musicales</h1>

      <div className="contenedor-botones">
        <Link to="/administracion" className="link-boton">
          <button className="add-button">
            <p><IoChevronBack style={{ margin: '0 6px' }}/></p>
            <p>Regresar</p>
          </button>
        </Link>
        <Link to="/administracion/Productos/CrearProducto" className="link-boton">
          <button className="add-button">
            <p><ImPlus style={{ margin: '0 6px' }}/></p>
            <p>Agregar productos</p>
          </button>
        </Link>
      </div>
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}

      <DataTable
        columns={columns}
        data={productos}
        selectableRows
        striped
        pagination
      />

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal" id="modal-borar">
            <img className="img-modal" src={ImgTrash} alt="" />
            <p className="text-modal" >{`¿Estas seguro que deseas eliminar el intrumento "${confirmDelete.name}?"`}</p>
            <div className="modal-content">              
              <div className="modal-buttons">
                <button className="izq" onClick={handleConfirmDelete}>Eliminar</button>
                <button className="der" onClick={() => setConfirmDelete(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;