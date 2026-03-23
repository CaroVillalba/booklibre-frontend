/* import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

import { DetalleLibro } from './main/pages/DetalleLibro/DetalleLibro'
import { HomeUsuario } from './main/pages/HomeUsuario/HomeUsuario'
import { PerfilUsuario } from './main/pages/PerfilUsuario/PerfilUsuario'


function AppContent() {
  return (
    <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeUsuario />} />
          <Route path="/detalle-libro" element={<DetalleLibro />} />
          <Route path="/perfil-usuario" element={<PerfilUsuario/>}/>
        </Routes>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
} */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

import { DetalleLibro } from './main/pages/DetalleLibro/DetalleLibro'
import { HomeUsuario } from './main/pages/HomeUsuario/HomeUsuario'
import { Login } from './main/pages/Auth/Login/Login'
import { Register } from './main/pages/Auth/Register/Register'
import { PerfilUsuario } from './main/pages/PerfilUsuario/PerfilUsuario'
import { EdicionLibro } from './main/pages/EdicionLibro/EdicionLibro'
import { MisPrestamos } from './main/pages/Prestamos/DetallePrestamos'
import { LayoutMain } from './main/pages/LayoutMain'
import { LayoutAuth } from './main/pages/LayoutAuth'


// Rutas donde NO se muestra el header
//const RUTAS_SIN_HEADER = ['/login', '/register']

function AppContent() {

  return (

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route path="/" element={<LayoutMain />}>
            <Route path="home" element={<HomeUsuario />} />
            <Route path="detalle-libro" element={<DetalleLibro />} />
        {/* <Route path="/mis-libros" element={<MisLibros />} /> */}
        {/* <Route path="/perfil" element={<Perfil />} /> */}
            <Route path="detalle-libro/:id" element={<DetalleLibro />} />
            <Route path="editar-detalles" element={<EdicionLibro />} />
            <Route path="prestamos" element={<MisPrestamos />} />
            <Route path="perfil/:id" element={<PerfilUsuario />} />
        </Route>
      </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}