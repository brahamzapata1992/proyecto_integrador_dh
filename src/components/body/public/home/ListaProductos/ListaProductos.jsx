import React, { useState, useEffect } from 'react';
import './ListaProductos.css';
import Card from './Card/Card';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productosPerPage] = useState(10); 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/admin/products');
                if (response.ok) {
                    const data = await response.json();
                    setProductos(data);
                } else {
                    setError('Error fetching product data');
                }
            } catch (error) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    
    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    const currentProductos = productos.slice(indexOfFirstProducto, indexOfLastProducto);

    
    const shuffledProductos = shuffleArray([...currentProductos]);

    
    const nextPage = () => {
        if (currentPage < Math.ceil(productos.length / productosPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='container-listado-cards'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <div className="grid-container-listaProductos">
                        {shuffledProductos.map((producto, index) => (
                            <Card
                                key={index}
                                id={producto.id} 
                                name={producto.name}
                                image={`data:image/jpeg;base64,${producto.images[0].imageData}`} 
                                price={producto.price}
                            />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(productos.length / productosPerPage)}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaProductos;

