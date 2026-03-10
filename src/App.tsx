import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "primereact/resources/themes/arya-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

import { HomeUsuario } from './main/pages/HomeUsuario/HomeUsuario'


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomeUsuario />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App