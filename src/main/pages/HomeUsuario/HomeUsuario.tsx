import React from "react";
import { Button } from 'primereact/button';

import { SidebarFiltros } from "../components/SidebarFiltros";

export const HomeUsuario = () => {

    return (
        <>
        <div className="grid">

        <div className="col-12 md:col-3">
            <SidebarFiltros />
        </div>

        <div className="col-12 md:col-9">
            {/* acá irán los libros */}
        </div>

        </div>
            <Button label="Buscar" icon="pi pi-search" severity="info" />
        </>
    )
}