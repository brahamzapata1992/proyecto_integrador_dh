import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import { IoChevronBack } from "react-icons/io5";
import { TbPhotoDown } from "react-icons/tb";
import './PublicDetalleProducto.css';

const PublicDetalleProducto = () => {
  const { id } = useParams();
  const { fetchProductById, loading, error } = useApi();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productDetails = await fetchProductById(id);
        setProduct(productDetails);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductDetails();
  }, [id, fetchProductById]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='container-principal-detalle-producto'>
      {product && (
        <>
          <div className="container-titulo-boton-detalle">
            <div className="titulo-detalle-producto">
              <p className='text-titulo-detalle-producto'>{product.name}</p>
            </div>
            <div className="boton-detalle-producto">
              <Link to='/home' className='link-back-detalle-producto'><p className='back-icon-header-detalle'><IoChevronBack /> Atras</p></Link>
            </div>
          </div>
          <div className='container-imagenes-deatlle-precio'>
          <div className="imagenes-detalle-producto-container">
              <div className='container-detalle-producto-imagen1'>
              {product.images && product.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                    alt={`${product.name}-image-0`}
                    className="img-1"
                  />
                )}
              </div>
              <div className='container-galeria-detalle-producto'>
                <div className='container-detalle-producto-imagen2'>
                {product.images && product.images.length > 1 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[1].imageData}`}
                      alt={`${product.name}-image-1`}
                      className="img-2"
                    />
                  )}
                </div>
                <div className='container-detalle-producto-imagen3'>
                {product.images && product.images.length > 2 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[2].imageData}`}
                      alt={`${product.name}-image-2`} 
                      className="img-3"
                    />
                  )}
                </div>
                <div className='container-detalle-producto-imagen4'>
                {product.images && product.images.length > 3 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[3].imageData}`}
                      alt={`${product.name}-image-3`}
                      className="img-4"
                    />
                  )}
                </div>
                <div className='container-detalle-producto-imagen5'>
                {product.images && product.images.length > 4 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[4].imageData}`}
                      alt={`${product.name}-image-4`}
                      className="img-5"
                    />
                  )}
                </div>
              </div>            
            </div>
            <div className="product-details-price-galery">
              <div className="product-price"><p className='precio-detalle-producto'>${Number(product.price).toLocaleString()} <span className='text-pordia-detalle-producto'>por dia</span> </p></div>
              <div className="product-gallery-icon-detalle"><TbPhotoDown /> Galería</div>
            </div>
            <div className="product-description-detalle-producto">
            <p>{product.description}</p>
            </div>
          </div>            
        </>
      )}
    </div>
  );
}

export default PublicDetalleProducto;
