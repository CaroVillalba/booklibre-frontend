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

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

import { DetalleLibro } from './main/pages/DetalleLibro/DetalleLibro'
import { HomeUsuario } from './main/pages/HomeUsuario/HomeUsuario'
import { Header } from './main/components/Header/Header'
import { PerfilUsuario } from './main/pages/PerfilUsuario/PerfilUsuario'
import { EdicionLibro } from './main/pages/EdicionLibro/EdicionLibro'
import { MisPrestamos } from './main/pages/Prestamos/DetallePrestamos'


// Rutas donde NO se muestra el header
const RUTAS_SIN_HEADER = ['/login']

function AppContent() {
  const location = useLocation()
  const mostrarHeader = !RUTAS_SIN_HEADER.includes(location.pathname)

  return (
    <div className="app-container">
      {mostrarHeader && (
        <Header
          bibliokarmas={120}
          usuarioNombre="Juan"
          onLogout={() => console.log('Logout')}
        />
      )}
      <Routes>
        <Route path="/" element={<HomeUsuario />} />
        <Route path="/detalle-libro" element={<DetalleLibro />} />
        <Route path="/editar-detalles" element={<EdicionLibro />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/prestamos" element={<MisPrestamos />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}