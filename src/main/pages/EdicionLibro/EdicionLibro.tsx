import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Card } from "primereact/card"
import { useState } from "react"
import type { LibroForm } from "../../../types/Libro"
import { libroService } from "../../services/LibroService"

export const EdicionLibro = () => {
        const libroVacio: LibroForm = {
            imgUrl: "",
            titulo: "",
            tipo: "",
            genero: "",
            autor: "",
            idioma: "",
            estado: "",
            editorial: "",
            fechaPublicacion: null,
            cantidadPaginas: null,
            isbn13: "",
            descripcion: ""
        }

        const tipos = [
            { label: "Común", value: "COMUN" },
            { label: "Con Dedicatoria", value: "DEDICATORIA" },
            { label: "Coleccionable", value: "COLECCIONABLE" }
        ]
        
        const generos = [
            { label: "Drama", value: "DRAMA" },
            { label: "Ciencia Ficción", value: "CIENCIA_FICCION" },
            { label: "Romance", value: "ROMANCE" },
            { label: "Autoayuda", value: "AUTOAYUDA" },
            { label: "Diseño", value: "DISENO" },
            { label: "Literatura", value: "LITERATURA" }
        ]
        
        const idiomas = [
            { label: "Francés", value: "FRANCES" },
            { label: "Español", value: "ESPANOL" },
            { label: "Inglés", value: "INGLES" },
            { label: "Portugués", value: "PORTUGUES" },
        ]
        
        const estados = [
            { label: "Excelente", value: "EXCELENTE" },
            { label: "Muy Bueno", value: "MUY_BUENO" },
            { label: "Bueno", value: "BUENO" },
            { label: "Regular", value: "REGULAR" },
            { label: "Malo", value: "MALO" }
        ]
        const [dialogVisible, setDialogVisible] = useState(false)
        const [urlPortada, setUrlPortada] = useState("")

        const [libro, setLibro] = useState<LibroForm>(libroVacio)

        const handleGuardar = async () => {
            try {
                const libroParaEnviar = {
                    ...libro,
                    imgUrl: urlPortada,
                }

                if (libro.id) {
                    await libroService.update(libroParaEnviar)
                } else {
                    await libroService.create(libroParaEnviar)
                }

            } catch(error) {
                console.error("Error al guardar el libro:", error)
            }
        }

        const handleCancelar = async () => {
            setLibro(libroVacio)
            setUrlPortada("")
        }

    return (
        <>
            <Dialog
                    header="Agregar portada"
                    visible={dialogVisible}
                    style={{ width: "30rem" }}
                    onHide={() => setDialogVisible(false)}
                >

                <div className="flex flex-column gap-3">
                    <label>URL de la imagen</label>

                    <InputText
                        value={urlPortada}
                        onChange={(e) => setUrlPortada(e.target.value)}
                        placeholder="https://..."
                    />

                    <Button
                        label="Guardar"
                        icon="pi pi-check"
                        onClick={() => setDialogVisible(false)}
                    />
                </div>
            </Dialog>

            <h2>Editar detalles del libro</h2>
            <p>Actualiza la información de tu libro listado para ayudar a los lectores a encontrarlo.</p>

            {/* PORTADA + BOTON ELIMINAR */}
            <div className="grid">
                <div className="col-12 md:col-4 lg:col-3">
                    <Card>
                        <div className="flex flex-column align-items-center gap-3">
                        
                            <div 
                                className="border-2 border-dashed border-300 border-round p-4 w-full text-center cursor-pointer"
                                onClick={() => setDialogVisible(true)}
                            >
                                {urlPortada ? (
                                    <img src={urlPortada} alt="portada" style={{ width: "100%" }} />
                                ) : (
                                    <div className="flex flex-column align-items-center">
                                        <i className="pi pi-cloud-upload text-4xl mb-2"></i>
                                        <p className="m-0">Subir Portada</p>
                                    </div>
                                )}
                            </div>

                            <Button 
                                label="Eliminar portada" 
                                severity="secondary" 
                                text 
                                icon="pi pi-trash"
                                onClick={() => setUrlPortada("")}
                            />
                        </div>
                    </Card>
                </div>

                { /* FORMULARIO */ }
                <div className="col-12 md:col-10 lg:col-9">
                    <Card>
                        <div className="grid  p-fluid">
                            {/* TITULO */}
                            <div className="field col-10">
                                <label htmlFor="titulo">Título</label>
                                <InputText id="titulo" 
                                    value={libro.titulo}
                                    onChange={(e) => setLibro({ ...libro, titulo: e.target.value })}
                                />
                            </div>

                            {/* TIPO */}
                            <div className="field col-10">
                                <label htmlFor="tipo">Tipo</label>
                                <Dropdown 
                                    id="tipo" 
                                    options={tipos} 
                                    value={libro.tipo}
                                    onChange={(e) => setLibro({ ...libro, tipo: e.value })}
                                />
                            </div>

                            {/* GENERO + AUTOR */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="genero">Género</label>
                                <Dropdown 
                                    id="genero" 
                                    options={generos} 
                                    value={libro.genero} 
                                    onChange={(e) => setLibro({ ...libro, genero: e.value })}   
                                />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="autor">Autor</label>
                                <InputText id="autor" 
                                    value={libro.autor}
                                    onChange={(e) => setLibro({ ...libro, autor: e.target.value })}
                                />
                            </div>

                            {/* IDIOMA + ESTADO */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="idioma">Idioma</label>
                                <Dropdown 
                                    id="idioma" 
                                    options={idiomas} 
                                    value={libro.idioma}
                                    onChange={(e) => setLibro({ ...libro, idioma: e.value })}
                                />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="estado">Estado</label>
                                <Dropdown 
                                    id="estado" 
                                    options={estados} 
                                    value={libro.estado}
                                    onChange={(e) => setLibro({ ...libro, estado: e.value })}
                                />
                            </div>

                            {/* EDITORIAL + FECHA */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="editorial">Editorial</label>
                                <InputText 
                                    id="editorial" 
                                    value={libro.editorial}
                                    onChange={(e) => setLibro({ ...libro, editorial: e.target.value })}
                                />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="fecha">Fecha de publicación</label>
                                <Calendar 
                                    id="fecha" 
                                    dateFormat="dd/mm/yy" 
                                    value={libro.fechaPublicacion}
                                    onChange={(e) => setLibro({ ...libro, fechaPublicacion: e.value ?? null })}
                                />
                            </div>

                            {/* PAGINAS + ISBN */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="paginas">Cantidad de Páginas</label>
                                <InputNumber 
                                    id="paginas" 
                                    value={libro.cantidadPaginas}
                                    onChange={(e) => setLibro({ ...libro, cantidadPaginas: e.value })}
                                />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="isbn">ISBN</label>
                                <InputText 
                                    id="isbn" 
                                    value={libro.isbn13}
                                    onChange={(e) => setLibro({ ...libro, isbn13: e.target.value })}
                                />
                            </div>

                            {/* DESCRIPCION */}
                            <div className="field col-10">
                                <label htmlFor="descripcion">Descripción</label>
                                <InputTextarea 
                                    id="descripcion" 
                                    rows={5} 
                                    value={libro.descripcion}
                                    onChange={(e) => setLibro({ ...libro, descripcion: e.target.value })}
                                />
                            </div>

                            {/* BOTONES */}
                            <div className="col-12 flex justify-content-end gap-2">
                                <Button label="Cancelar" severity="secondary" onClick={handleCancelar} />
                                <Button label="Guardar Cambios" icon="pi pi-save" onClick={handleGuardar} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}