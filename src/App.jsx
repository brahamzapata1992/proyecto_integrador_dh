import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import Header from "./components/header/Header";
import HomePrincipal from "./components/body/public/home/HomePrincipal";
import CrearCuenta from './components/body/user/crearCuenta/CrearCuenta';
import IniciarSesion from './components/body/user/login/IniciarSesion';
import Footer from './components/footer/Footer';
import Dashboard from './components/body/admin/Dashboard/Dashboard'
import Filtro from './components/body/public/home/Categorias/filtro/Filtro';
import PublicDetalleProducto from './components/body/public/home/detalleProducto/PublicDetalleProducto';
import AdminUsuarios from './components/body/admin/administrarUsuario/AdminUsuarios'
import AdminCategorias from './components/body/admin/administrarCategorias/AdminCategorias'
function App() {
  

  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <Header/>
          <Routes>
            /* Pagina principal */
            <Route path="/home" element={<HomePrincipal />} />
            <Route path="/detalle-producto/:id" element={<PublicDetalleProducto />} />
            <Route path="/categoria/:id/:nombreCategoria" element={<Filtro />}/>
            /* seccion login*/
            <Route path="/registro" element={<CrearCuenta />}/>
            <Route path="/inicioSesion" element={<IniciarSesion />}/>
            /* Pagina Admin */
            <Route path="/administracion" element={<Dashboard />} />
            /* administrar usuarios*/
            <Route path="/administracion/Usuarios" element={<AdminUsuarios />} />
            /* administrar categorias*/
            <Route path="/administracion/Categorias" element={<AdminCategorias />} /> 
          </Routes>
          <Footer/>         
        </ApiProvider> 
      </BrowserRouter>
    </>
  )
}

export default App
