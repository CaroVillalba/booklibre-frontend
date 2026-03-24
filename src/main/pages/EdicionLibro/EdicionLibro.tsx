import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputNumber } from "primereact/inputnumber"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Card } from "primereact/card"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import type { LibroForm } from "../../../types/Libro"
import { libroService } from "../../services/LibroService"
import { useOnInit } from '../../hooks/useOnInit';
import { getMensajeError } from '../../../utils/errorHandling'
import { MainContext } from "../../../types/MainContext"

type ErroresFormulario = Partial<Record<keyof LibroForm, string>>

type Regla<T> = {
    campo: keyof T
    validar: (valor: T[keyof T], data: T) => boolean
    mensaje: string
}

const crearLibroVacio = (): LibroForm => ({
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
})

const validar = <T,>(data: T, reglas: Regla<T>[]) => {
    const errores: Partial<Record<keyof T, string>> = {}

    for (const { campo, validar, mensaje } of reglas) {
        const valor = data[campo]
        if (!validar(valor, data) && !errores[campo]) {
            errores[campo] = mensaje
        }
    }

    return errores
}

export const EdicionLibro = () => {
    const { id } = useParams()
    const { showToast } = useContext(MainContext)
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
    const [libro, setLibro] = useState<LibroForm>(crearLibroVacio())
    const [errores, setErrores] = useState<ErroresFormulario>({})
    const [tempImgUrl, setTempImgUrl] = useState("")

    const reglas: Regla<LibroForm>[] = [
        {
            campo: "imgUrl",
            validar: (v) => typeof v === 'string' && /^(https?:\/\/.*\.(png|jpg|jpeg|gif|svg))$/i.test(v || ""),
            mensaje: "Debe ser una URL válida de imagen"
        },
        {
            campo: "titulo",
            validar: (v) => typeof v === 'string' && !!v.trim(),
            mensaje: "El título es obligatorio"
        },
        {
            campo: "tipo",
            validar: (v) => !!v,
            mensaje: "Seleccioná un tipo"
        },
        {
            campo: "genero",
            validar: (v) => !!v,
            mensaje: "Seleccioná un género"
        },
        {
            campo: "autor",
            validar: (v) => typeof v === 'string' && !!v?.trim(),
            mensaje: "El autor es obligatorio"
        },
        {
            campo: "cantidadPaginas",
            validar: (v) => typeof v === 'number' && v != null && v > 0,
            mensaje: "Debe ser mayor a 0"
        },
        {
            campo: "isbn13",
            validar: (v) => typeof v === 'string' && /^\d{13}$/.test(v || ""),
            mensaje: "Debe tener 13 dígitos"
        },
        {
            campo: "fechaPublicacion",
            validar: (v) => v instanceof Date && v != null,
            mensaje: "La fecha es obligatoria"
        },
        {
            campo: "fechaPublicacion",
            validar: (v) => v instanceof Date && v <= new Date(),
            mensaje: "No puede ser futura"
        },
        {
            campo: "editorial",
            validar: (v) => typeof v === 'string' && !!v?.trim(),
            mensaje: "La editorial es obligatoria"
        },
        {
            campo: "idioma",
            validar: (v) => !!v,
            mensaje: "Seleccioná un idioma"
        },
        {
            campo: "estado",
            validar: (v) => !!v,
            mensaje: "Seleccioná un estado"
        },
        {
            campo: "descripcion",
            validar: (v) => typeof v === 'string' && !!v?.trim(),
            mensaje: "La descripción es obligatoria"
        }
    ]

    const cargarDatosIniciales = async () => {
        if (id) {
            try {
                const data = await libroService.getById(Number(id))
                setLibro({
                    ...data,
                    fechaPublicacion: data.fechaPublicacion ? new Date(data.fechaPublicacion) : null
                })
            } catch (error) {
                showToast("Error al cargar el libro", "error")
            }
        } else {
            setLibro(crearLibroVacio())
        }

        
    }
    useOnInit(cargarDatosIniciales)

    const validarFormulario = () => {
        const erroresValidados = validar(libro, reglas)
        setErrores(erroresValidados)

        if (Object.keys(erroresValidados).length > 0) {
            showToast(
                "Revisá:\n• " + Object.values(erroresValidados).join("\n• "),
                "warning"
            )
            return false
        }

        return true
    }

    const abrirDialogImagen = () => {
        setTempImgUrl(libro.imgUrl ?? "")
        setDialogVisible(true)
    }
    
    const confirmarImagen = () => {
        updateCampo("imgUrl", tempImgUrl)
        setDialogVisible(false)
    }

    const handleGuardar = async () => {
        if (!validarFormulario()) return

        try {
            if (libro.id) {
                await libroService.update(libro)
                showToast("Libro actualizado correctamente", "success")
            } else {
                await libroService.create(libro)
                showToast("Libro creado correctamente", "success")
            }

        } catch(error) {
            showToast(getMensajeError(error), 'error')
        }
    }

    const handleCancelar = async () => {
        setLibro(crearLibroVacio())
        setErrores({})
    }

    const updateCampo = <K extends keyof LibroForm>(campo: K, valor: LibroForm[K]) => {
        setLibro({ ...libro, [campo]: valor })

        if (errores[campo]) {
            setErrores(prev => {
                const nuevosErrores = { ...prev }
                delete nuevosErrores[campo]
                return nuevosErrores
            })
        }
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
                        value={tempImgUrl}
                        onChange={(e) => setTempImgUrl(e.target.value)}
                        placeholder="https://..."
                        className={errores.imgUrl ? "p-invalid" : ""}
                    />

                    {errores.imgUrl && (
                        <small className="p-error">{errores.imgUrl}</small>
                    )}

                    <Button
                        label="Guardar"
                        icon="pi pi-check"
                        onClick={() => confirmarImagen()}
                    />
                </div>
            </Dialog>
            <div className="grid">
                <div className="col-12 mb-3">
                    <h2 className="m-0">Editar detalles del libro</h2>
                    <p className="text-gray-500">
                        Actualiza la información de tu libro listado para ayudar a los lectores a encontrarlo.
                    </p>
                </div>

                {/* PORTADA + BOTON ELIMINAR */}
                <div className="col-12 md:col-4 lg:col-3">
                    <Card>
                        <div className="flex flex-column align-items-center gap-3">
                        
                            <div 
                                className="border-2 border-dashed border-300 border-round p-4 w-full text-center cursor-pointer"
                                onClick={() => abrirDialogImagen()}
                            >
                                {libro.imgUrl ? (
                                    <img src={libro.imgUrl} alt="portada" style={{ width: "100%" }} />
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
                                onClick={() => updateCampo("imgUrl", "")}
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
                                    onChange={(e) => updateCampo("titulo", e.target.value)}
                                    className={errores.titulo ? "p-invalid" : ""}
                                />
                
                                {errores.titulo && (
                                    <small className="p-error">{errores.titulo}</small>
                                )}
                            </div>

                            {/* TIPO */}
                            <div className="field col-10">
                                <label htmlFor="tipo">Tipo</label>
                                <Dropdown 
                                    id="tipo" 
                                    options={tipos} 
                                    value={libro.tipo}
                                    onChange={(e) => updateCampo("tipo", e.target.value)}
                                    className={errores.tipo ? "p-invalid" : ""}
                                />
                            
                                {errores.tipo && (
                                    <small className="p-error">{errores.tipo}</small>
                                )}
                            </div>

                            {/* GENERO + AUTOR */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="genero">Género</label>
                                <Dropdown 
                                    id="genero" 
                                    options={generos} 
                                    value={libro.genero} 
                                    onChange={(e) => updateCampo("genero", e.target.value)}   
                                    className={errores.genero ? "p-invalid" : ""}
                                />
                            
                                {errores.genero && (
                                    <small className="p-error">{errores.genero}</small>
                                )}
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="autor">Autor</label>
                                <InputText id="autor" 
                                    value={libro.autor}
                                    onChange={(e) => updateCampo("autor", e.target.value)}
                                    className={errores.autor ? "p-invalid" : ""}
                                />
            
                                {errores.autor && (
                                    <small className="p-error">{errores.autor}</small>
                                )}
                            </div>

                            {/* IDIOMA + ESTADO */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="idioma">Idioma</label>
                                <Dropdown 
                                    id="idioma" 
                                    options={idiomas} 
                                    value={libro.idioma}
                                    onChange={(e) => updateCampo("idioma", e.target.value)}
                                    className={errores.idioma ? "p-invalid" : ""}
                                />
                            
                                {errores.idioma && (
                                    <small className="p-error">{errores.idioma}</small>
                                )}
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="estado">Estado</label>
                                <Dropdown 
                                    id="estado" 
                                    options={estados} 
                                    value={libro.estado}
                                    onChange={(e) => updateCampo("estado", e.target.value)}
                                    className={errores.estado ? "p-invalid" : ""}
                                />
                            
                                {errores.estado && (
                                    <small className="p-error">{errores.estado}</small>
                                )}
                            </div>

                            {/* EDITORIAL + FECHA */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="editorial">Editorial</label>
                                <InputText 
                                    id="editorial" 
                                    value={libro.editorial}
                                    onChange={(e) => updateCampo("editorial", e.target.value)}
                                    className={errores.editorial ? "p-invalid" : ""}
                                />
            
                                {errores.editorial && (
                                    <small className="p-error">{errores.editorial}</small>
                                )}
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="fecha">Fecha de publicación</label>
                                <Calendar 
                                    id="fecha" 
                                    dateFormat="dd/mm/yy" 
                                    value={libro.fechaPublicacion}
                                    onChange={(e) => updateCampo("fechaPublicacion", e.value?? null)}
                                    className={errores.fechaPublicacion ? "p-invalid" : ""}
                                />
                            
                                {errores.fechaPublicacion && (
                                    <small className="p-error">{errores.fechaPublicacion}</small>
                                )}
                            </div>

                            {/* PAGINAS + ISBN */}
                            <div className="field col-12 md:col-5">
                                <label htmlFor="paginas">Cantidad de Páginas</label>
                                <InputNumber 
                                    id="paginas" 
                                    value={libro.cantidadPaginas}
                                    onChange={(e) => updateCampo("cantidadPaginas", e.value)}
                                    className={errores.cantidadPaginas ? "p-invalid" : ""}
                                />
                
                                {errores.cantidadPaginas && (
                                    <small className="p-error">{errores.cantidadPaginas}</small>
                                )}
                            </div>

                            <div className="field col-12 md:col-5">
                                <label htmlFor="isbn">ISBN</label>
                                <InputText 
                                    id="isbn" 
                                    value={libro.isbn13}
                                    onChange={(e) => updateCampo("isbn13", e.target.value)}
                                    className={errores.isbn13 ? "p-invalid" : ""}
                                />
            
                                {errores.isbn13 && (
                                    <small className="p-error">{errores.isbn13}</small>
                                )}
                            </div>

                            {/* DESCRIPCION */}
                            <div className="field col-10">
                                <label htmlFor="descripcion">Descripción</label>
                                <InputTextarea 
                                    id="descripcion" 
                                    rows={5} 
                                    value={libro.descripcion}
                                    onChange={(e) => updateCampo("descripcion", e.target.value)}
                                    className={errores.descripcion ? "p-invalid" : ""}
                                />
            
                                {errores.descripcion && (
                                    <small className="p-error">{errores.descripcion}</small>
                                )}
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