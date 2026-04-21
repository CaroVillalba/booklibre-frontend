import { Outlet, Navigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useToast } from "../hooks/useToast";
import { Toast } from "../components/common/toast";
import { Header } from "../components/Header/Header";
import { MainContext } from "../../types/MainContext";
import type { MainContextType } from "../../types/MainContext";
import type { Usuario } from "../../types/Usuario";
//import { routeConfig } from "../config/routeConfig";
import { useCallback } from "react";
import { checkLoggedIn } from "../services/TokenService";

export const LayoutMain = () => {
    const { toast, showToast } = useToast()
    const  [ usuario, setUsuario ] = useState<Usuario | null>(null)

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


    
    if (!checkLoggedIn()) {
        return (<Navigate to="/login" replace />)
    }

    return (

        <MainContext.Provider value={contextValue}>
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