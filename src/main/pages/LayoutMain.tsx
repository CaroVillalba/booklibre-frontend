import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useToast } from "../hooks/useToast";
import { Toast } from "../components/common/toast";
import { Header } from "../components/Header/Header";
import { MainContext } from "../../types/MainContext";
import type { MainContextType } from "../../types/MainContext";
import type { Usuario } from "../../types/Usuario";
import { 
    checkLoggedIn, 
    getUserRolesFromToken, 
    subscribeToTokens,
    isSessionExpired,
    setSessionExpired  
} from "../services/TokenService";
import { SessionExpiredModal } from "../components/SessionExpiredModal";  

export const LayoutMain = () => {
    const location = useLocation()
    const { toast, showToast } = useToast()
    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [logueado, setLogueado] = useState(checkLoggedIn())
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false)  

    useEffect(() => {
        const unsubscribe = subscribeToTokens(() => {
            setLogueado(checkLoggedIn())
            
            
            if (isSessionExpired()) {
                setShowSessionExpiredModal(true)
            }
        })
        return unsubscribe
    }, [])

    const actualizarBibliokarmas = useCallback((nuevoPuntaje: number) => {
        setUsuario((prevUsuario) => {
            if (!prevUsuario) return null;
            return { ...prevUsuario, biblioKarmas: nuevoPuntaje };
        });
    }, []);

    const contextValue: MainContextType = useMemo(() => ({
        showToast,
        usuario,
        setUsuario,
        actualizarBibliokarmas,
    }), [showToast, usuario, actualizarBibliokarmas]);

    
    const handleCloseSessionModal = () => {
        setShowSessionExpiredModal(false)
        setSessionExpired(false)  
    }

    
    if (!logueado && !showSessionExpiredModal) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        )
    }

    const role = getUserRolesFromToken()
    const isEditarLibro = location.pathname.startsWith("/editar-libro")

    if (
        isEditarLibro &&
        !["PUBLICADOR", "LECTOR_PUBLICADOR"].includes(role)
    ) {
        return <Navigate to="/home" replace />
    }

    return (
        <MainContext.Provider value={contextValue}>
            
            <SessionExpiredModal 
                visible={showSessionExpiredModal}
                onClose={handleCloseSessionModal}
            />
            
            <Header />
            <main className="main-content">
                <Outlet context={{}} />
            </main>
            <div id="toast-container">
                <Toast toast={toast} />
            </div>
        </MainContext.Provider>
    )
}