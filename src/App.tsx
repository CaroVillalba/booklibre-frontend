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
import { NotFound } from './main/pages/NotFound/NotFound'

function AppContent() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<LayoutMain />}>
            <Route path="home" element={<HomeUsuario />} />
            <Route path="detalle-libro" element={<DetalleLibro />} />
            <Route path="detalle-libro/:id" element={<DetalleLibro />} />
            <Route path="editar-libro" element={<EdicionLibro />} />
            <Route path="editar-libro/:id" element={<EdicionLibro />} />
            <Route path="prestamos" element={<MisPrestamos />} />
            <Route path="perfil" element={<PerfilUsuario />} />
            <Route path="/perfil/*" element={<Navigate to="/perfil" replace />} />
            <Route path="*" element={<NotFound/>} />
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