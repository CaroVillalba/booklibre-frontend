import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Card } from "primereact/card"
import { useState } from "react"

export const EdicionLibro = () => {
        const tipos = [
            { label: "Común", value: "comun" },
            { label: "Coleccionable", value: "coleccionable" },
            { label: "Con Dedicatoria", value: "dedicatoria" }
        ]
        
        const generos = [
            { label: "Romance", value: "contemporaneo" },
            { label: "Drama", value: "drama" },
            { label: "Ciencia Ficción", value: "ciencia_ficcion" },
            { label: "Literatura", value: "literatura" }
        ]
        
        const idiomas = [
            { label: "Español", value: "es" },
            { label: "Inglés", value: "en" },
            { label: "Francés", value: "fr" }
        ]
        
        const estados = [
            { label: "Excelente", value: "excelente" },
            { label: "Muy Bueno", value: "muy_bueno" },
            { label: "Bueno", value: "bueno" },
            { label: "Malo", value: "malo" }
        ]
        const [dialogVisible, setDialogVisible] = useState(false)
        const [urlPortada, setUrlPortada] = useState("")

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
                                        <small>PNG, JPG hasta 5MB</small>
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
                                <InputText id="titulo" />
                            </div>

                            {/* TIPO */}
                            <div className="field col-10">
                                <label htmlFor="tipo">Tipo</label>
                                <Dropdown id="tipo" options={tipos} />
                            </div>

                            {/* GENERO + AUTOR */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="genero">Género</label>
                                <Dropdown id="genero" options={generos} />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="autor">Autor</label>
                                <InputText id="autor" />
                            </div>

                            {/* IDIOMA + ESTADO */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="idioma">Idioma</label>
                                <Dropdown id="idioma" options={idiomas} />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="estado">Estado</label>
                                <Dropdown id="estado" options={estados} />
                            </div>

                            {/* EDITORIAL + FECHA */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="editorial">Editorial</label>
                                <InputText id="editorial" />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="fecha">Fecha de publicación</label>
                                <Calendar id="fecha" dateFormat="dd/mm/yy" />
                            </div>

                            {/* PAGINAS + ISBN */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="paginas">Cantidad de Páginas</label>
                                <InputNumber id="paginas" />
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="isbn">ISBN</label>
                                <InputText id="isbn" />
                            </div>

                            {/* DESCRIPCION */}
                            <div className="field col-10">
                                <label htmlFor="descripcion">Descripción</label>
                                <InputTextarea id="descripcion" rows={5} />
                            </div>

                            {/* BOTONES */}
                            <div className="col-12 flex justify-content-end gap-2">
                                <Button label="Cancelar" severity="secondary" />
                                <Button label="Guardar Cambios" icon="pi pi-save" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}