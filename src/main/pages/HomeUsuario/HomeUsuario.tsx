import React from "react";

import { SidebarFiltros } from "../components/SidebarFiltros";
import { BusquedaLibros } from "../components/BusquedaLibros";
import { LibroCard } from "../components/LibroCard";

export const HomeUsuario = () => {

    return (
        <>
        <div className="grid">

        <div className="col-12 md:col-3">
            <SidebarFiltros />
        </div>

        <BusquedaLibros />

        <div className="col-12 md:col-9">
            <LibroCard />
        </div>

        </div>
        </>
    )
}