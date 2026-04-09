import { createContext } from 'react'
import type { Usuario } from './Usuario'



export type MainContextType = {
    showToast: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void
    usuario : Usuario | null
    setUsuario: ( u: Usuario | null ) => void
    actualizarBibliokarmas: ( nuevoPuntaje: number ) => void

}

export const MainContext = createContext<MainContextType>({
    showToast: () => {},
    usuario: null,      
    setUsuario: () => {}, 
    actualizarBibliokarmas: () => {}, 

})