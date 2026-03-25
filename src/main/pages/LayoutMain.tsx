import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useToast } from "../hooks/useToast";
import { Toast } from "../components/common/toast";
import { Header } from "../components/Header/Header";
import { MainContext } from "../../types/MainContext";
import type { MainContextType } from "../../types/MainContext";
import { loginService } from "../services/AuthService";
//import { routeConfig } from "../config/routeConfig";

export const LayoutMain = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { toast, showToast } = useToast()

    const contextValue: MainContextType = useMemo(() => ({
        showToast,
    }), [showToast])

    //check si esta loggeado
    if (!loginService.checkLoggedIn()) {
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