import React from "react";

import { SidebarFiltros } from "../components/SidebarFiltros";
import { BusquedaLibros } from "../components/BusquedaLibros";
import { LibroCard } from "../components/LibroCard";

export const HomeUsuario = () => {

    
    return (
        <>
            <div className="col-12 md:col-3">
                <SidebarFiltros />
            </div>

            <BusquedaLibros />

            <div className="grid">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="col-12 md:col-4 lg:col-3">
                        <LibroCard />
                    </div>
                ))}
            </div>
        </>
    )
}