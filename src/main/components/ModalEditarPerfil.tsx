import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import type { Dispatch, SetStateAction } from "react"
import type { TipoUsuario, UsuarioUpdateRequest } from "../../types/Usuario"

interface ModalEditarPerfilProps {
    visible: boolean
    onHide: () => void
    usuarioEditado: UsuarioUpdateRequest | null
    setUsuarioEditado: Dispatch<SetStateAction<UsuarioUpdateRequest | null>>
    onGuardar: (usuario: UsuarioUpdateRequest) => Promise<void>
}

const opcionesTipoUsuario = [
    { label: "Lector", value: "LECTOR" },
    { label: "Publicador", value: "PUBLICADOR" },
    { label: "Lector / Publicador", value: "LECTOR_PUBLICADOR" }
]

export const ModalEditarPerfil = ({
    visible,
    onHide,
    usuarioEditado,
    setUsuarioEditado,
    onGuardar
}: ModalEditarPerfilProps) => {

    if (!usuarioEditado) return null

    const cambiarCampo = (
        campo: keyof UsuarioUpdateRequest,
        valor: string | TipoUsuario | null
    ) => {
        setUsuarioEditado((prev) => {
            if (!prev) return prev

            return {
                ...prev,
                [campo]: valor
            }
        })
    }

    const guardarCambios = async () => {
    await onGuardar(usuarioEditado)
}

    return (
        <Dialog
            header="Editar perfil"
            visible={visible}
            onHide={onHide}
            modal
            style={{ width: "40rem" }}
        >
            <div className="flex flex-column gap-3 pt-2">

                {/* <div className="flex flex-column gap-2">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                        id="nombre"
                        placeholder="Nombre"
                        value={usuarioEditado.nombre}
                        onChange={(e) => cambiarCampo("nombre", e.target.value)}
                    />
                </div> */}

                <div className="flex flex-column gap-2">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText
                        id="descripcion"
                        placeholder="Descripción"
                        value={usuarioEditado.descripcion}
                        onChange={(e) => cambiarCampo("descripcion", e.target.value)}
                    />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        placeholder="Email"
                        value={usuarioEditado.email}
                        onChange={(e) => cambiarCampo("email", e.target.value)}
                    />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="celular">Celular</label>
                    <InputText
                        id="celular"
                        placeholder="Celular"
                        value={usuarioEditado.celular}
                        onChange={(e) => cambiarCampo("celular", e.target.value)}
                    />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="ciudad">Ciudad</label>
                    <InputText
                        id="ciudad"
                        placeholder="Ciudad"
                        value={usuarioEditado.ciudad}
                        onChange={(e) => cambiarCampo("ciudad", e.target.value)}
                    />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="fotoPerfil">Foto de perfil (URL)</label>
                    <InputText
                        id="fotoPerfil"
                        placeholder="URL Imagen"
                        value={usuarioEditado.fotoPerfil ?? ""}
                        onChange={(e) => cambiarCampo("fotoPerfil", e.target.value)}
                    />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="tipoUsuario">Tipo de perfil</label>
                    <Dropdown
                        id="tipoUsuario"
                        value={usuarioEditado.tipoUsuario}
                        options={opcionesTipoUsuario}
                        onChange={(e) => cambiarCampo("tipoUsuario", e.value)}
                        placeholder="Seleccioná un tipo"
                    />
                </div>

                <div className="flex justify-content-end gap-2 mt-3">
                    <Button
                        label="Cancelar"
                        text
                        severity="secondary"
                        onClick={onHide}
                    />
                    <Button
                        className="text-color p-button-primary"
                        label="Guardar cambios"
                        onClick={guardarCambios}
                    />
                </div>
            </div>
        </Dialog>
    )
}