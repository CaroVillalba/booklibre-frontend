import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

import { DetalleLibro } from './main/pages/DetalleLibro/DetalleLibro'
import { HomeUsuario } from './main/pages/HomeUsuario/HomeUsuario'


function AppContent() {
  return (
    <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeUsuario />} />
          <Route path="/detalle-libro" element={<DetalleLibro />} />
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
}