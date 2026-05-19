import { Outlet } from 'react-router-dom'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/common/toast'
import { MainContext } from '../../types/MainContext'

export const LayoutAuth = () => {
    const { toast, showToast } = useToast()

    return (
        <MainContext.Provider
            value={{
                showToast,
                usuario: null,
                setUsuario: () => {},
                actualizarBibliokarmas: () => {},
            }}
        >
            <main className='auth-content'>
                <Outlet context= { {showToast} }/>
            </main>
            <div id= "toast-container">
                <Toast toast = { toast } />
            </div>
        </MainContext.Provider>
    )
}