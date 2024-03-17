import React from 'react'
import BuscadorProductos from './BuscadorProductos/BuscadorProductos'
import Categorias from './Categorias/Categorias'
import ListaProductos from './ListaProductos/ListaProductos'

const home = () => {
  return (
    <>
      <BuscadorProductos />
      <Categorias/>
      <ListaProductos />
    </>
  )
}

export default home