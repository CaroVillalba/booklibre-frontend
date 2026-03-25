import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";
import { usuarioService } from "../services/UsuarioService";
import { useEffect, useState } from "react";
import type { LibroUsuario } from "../../types/Libro";

interface UsuarioLibrosProps{
    usuarioId: number
}

export const UsuarioLibros = ({usuarioId}:UsuarioLibrosProps) => {
    const navigate = useNavigate();

    const [libros,setLibros]= useState<LibroUsuario[]>([])
    const [page, setPage] = useState(0)
    const [size] = useState(3)
    const [sortBy, setSortBy] = useState("fechaAgregado")
    const [direction, setDirection] = useState("desc")
    const [estado, setEstado] = useState("TODOS")
    const [totalElements, setTotalElements] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
    usuarioService
        .getLibrosDeUsuario(usuarioId, page, size, sortBy, direction, estado)
        .then((data) => {
            setLibros(data.content)
            setTotalElements(data.totalElements)
            setTotalPages(data.totalPages)
        })
        .catch((error) => {
            console.error("Error al cargar libros del usuario", error)
        })
    }, [usuarioId, page, size, sortBy, direction, estado])

    const cambiarOrden = (campo: string) => {
        let nuevoSortBy = sortBy
        let nuevaDirection = direction

        if (sortBy === campo) {
            nuevaDirection = direction === "asc" ? "desc" : "asc"
        } else {
            nuevoSortBy = campo
            nuevaDirection = campo === "fechaAgregado" ? "desc" : "asc"
        }

        if (nuevoSortBy === sortBy && nuevaDirection === direction && page === 0) return

        setSortBy(nuevoSortBy)
        setDirection(nuevaDirection)
        setPage(0)
    }

    const cambiarFiltro = (nuevoEstado: string) => {
        if (estado === nuevoEstado && page === 0) return
        setEstado(nuevoEstado)
        setPage(0)
    }

    const irPaginaAnterior = () => {
        if (page === 0) return
        setPage(page - 1)
    }

    const irPaginaSiguiente = () => {
        if (page + 1 >= totalPages) return
        setPage(page + 1)
    }

    const formatearFecha = (fecha:string)=> {
        return new Date(fecha).toLocaleDateString("es-AR",{
            day: "2-digit",
            month: "short",
            year:"numeric",
        })
    }

    const formatearGenero = (genero: string) => {
    const texto = genero
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())

    const correcciones: Record<string, string> = {
        "Ciencia Ficcion": "Ciencia Ficción",
        "Diseno": "Diseño"
    }

    return correcciones[texto] || texto
}

    const desde = totalElements === 0 ? 0 : page * size + 1
    const hasta = page*size + libros.length

    const getSortIcon = (campo: string) => {
    if (sortBy !== campo) return "pi pi-sort-alt"
    return direction === "asc" ? "pi pi-sort-up" : "pi pi-sort-down"
}


    return (
        <div>
            <div>
                <div className="flex justify-content-between align-items-center mb-2">
                    <h2 className="m-0 text-2xl">Gestión de Mis Libros</h2>
                    <Button
                        label="Agregar Nuevo Libro"
                        icon="pi pi-plus"
                        iconPos="left"
                        className="p-button-secondary p-button-outlined text-color"
                        onClick={() => navigate(`/editar-libro`)}
                    />
                </div>
                <Card className="border-round-2xl shadow-1" >
                    {/* tabs */}
                    <div className="flex gap-2">
                        <Button
                            label="Todos"
                            className={estado === "TODOS" ? "text-color p-button-primary" : "text-color"}
                            outlined={estado !== "TODOS"}
                            onClick={() => cambiarFiltro("TODOS")}
                        />
                        <Button
                            label="Disponibles"
                            className={estado === "DISPONIBLE" ? "text-color p-button-primary" : "text-color"}
                            outlined={estado !== "DISPONIBLE"}
                            onClick={() => cambiarFiltro("DISPONIBLE")}
                        />
                        <Button
                            label="Prestados"
                            className={estado === "PRESTADO" ? "text-color p-button-primary" : "text-color"}
                            outlined={estado !== "PRESTADO"}
                            onClick={() => cambiarFiltro("PRESTADO")}
                        />
                    </div>
                    {/* header tabla */}
                    <div className="flex align-items-center px-3 pt-3 pb-2 border-bottom-1 surface-border justify-content-between">
                        <button className="w-5 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2" onClick={() => cambiarOrden("titulo")}>
                            <span>TÍTULO Y AUTOR</span>
                            <i className={getSortIcon("titulo")}></i>
                        </button>
                        <button className="w-2 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2" onClick={() => cambiarOrden("disponibilidad")}>
                            <span>DISPONIBLE</span>
                            <i className={getSortIcon("disponibilidad")}></i>
                        </button>
                        <button className="w-2 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2" onClick={() => cambiarOrden("fechaAgregado")}>
                            <span>AGREGADO</span>
                            <i className={getSortIcon("fechaAgregado")}></i>
                        </button>
                        <div className="w-2 text-center">ACCIONES</div>
                    </div>

                    {/* libros */}
                    {libros.map((libro) => (
                    <div className="flex align-items-center px-3 py-2 border-bottom-1 surface-border justify-content-between">
                        {/* TITULO Y AUTOR */}
                        <div className="w-5">
                            <div className="flex align-items-center gap-3">
                                <img
                                    src={libro.imgUrl}
                                    alt={libro.titulo}
                                    className="perfil-libro-img"
                                />

                                <div className="flex flex-column gap-1">
                                    <span className="font-semibold">
                                        {libro.titulo}
                                    </span>
                                    <span className="text-sm text-color-secondary">
                                        {libro.autor}
                                    </span>
                                    <span className="text-xs text-color-secondary">
                                        {formatearGenero(libro.genero)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* DISPONIBLE */}
                        <div className="w-2 flex justify-content-center">
                            <Tag
                                value={libro.disponible ? "Disponible" : "Prestado"}
                                className={libro.disponible ? "tag-disponible" : "tag-prestado"}
                            />
                        </div>

                        {/* AGREGADO */}
                        <div className="w-2 text-center">{formatearFecha(libro.fechaAgregado)}</div>

                        {/* ACCIONES */}
                        <div className="w-2 flex justify-content-center gap-2">
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                text
                                severity="secondary"
                                onClick={() => navigate(`/editar-libro/${libro.id}`)}
                            />

                            <Button
                                icon="pi pi-trash"
                                rounded
                                text
                                severity="danger"
                            />
                        </div>
                    </div>
                    ))}

                    {/* footer */}
                    <div className="flex align-items-center justify-content-between px-3 pt-2 pb-1">
                        
                        <span className="text-sm text-color-secondary">
                            Mostrando {desde}-{hasta} de {totalElements} libros
                        </span>

                        <div className="flex gap-2">
                            <Button
                                icon="pi pi-chevron-left"
                                text
                                rounded
                                severity="secondary"
                                disabled={page === 0}
                                onClick={irPaginaAnterior}
                            />

                            <Button
                                icon="pi pi-chevron-right"
                                text
                                rounded
                                severity="secondary"
                                disabled={page + 1 >= totalPages}
                                onClick={irPaginaSiguiente}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
