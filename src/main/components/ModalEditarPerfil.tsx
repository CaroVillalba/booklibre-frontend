import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { TipoUsuario, UsuarioUpdateRequest } from "../../types/Usuario";

interface ModalEditarPerfilProps {
    visible: boolean;
    onHide: () => void;
    usuarioEditado: UsuarioUpdateRequest | null;
    setUsuarioEditado: Dispatch<SetStateAction<UsuarioUpdateRequest | null>>;
    onGuardar: (usuario: UsuarioUpdateRequest) => Promise<void>;
}

const opcionesTipoUsuario = [
    { label: "Lector", value: "LECTOR" },
    { label: "Publicador", value: "PUBLICADOR" },
    { label: "Lector / Publicador", value: "LECTOR_PUBLICADOR" },
];

export const ModalEditarPerfil = ({
    visible,
    onHide,
    usuarioEditado,
    setUsuarioEditado,
    onGuardar,
}: ModalEditarPerfilProps) => {
    const [errores, setErrores] = useState<
        Partial<Record<keyof UsuarioUpdateRequest, string>>
    >({});
    if (!usuarioEditado) return null;

    const cambiarCampo = (
        campo: keyof UsuarioUpdateRequest,
        valor: string | TipoUsuario | null,
    ) => {
        setUsuarioEditado((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                [campo]: valor,
            };
        });

        setErrores((prev) => ({
            ...prev,
            [campo]: "",
        }));
    };

    const validar = () => {
        const nuevosErrores: Partial<
            Record<keyof UsuarioUpdateRequest, string>
        > = {};

        if (!usuarioEditado.descripcion?.trim()) {
            nuevosErrores.descripcion = "La descripción es obligatoria";
        }

        if (!usuarioEditado.email?.trim()) {
            nuevosErrores.email = "El email es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioEditado.email)) {
            nuevosErrores.email = "El email no es válido";
        }

        if (!usuarioEditado.celular?.trim()) {
            nuevosErrores.celular = "El celular es obligatorio";
        }

        if (!usuarioEditado.ciudad?.trim()) {
            nuevosErrores.ciudad = "La ciudad es obligatoria";
        }

        if (usuarioEditado.fotoPerfil?.trim()) {
            try {
                new URL(usuarioEditado.fotoPerfil);
            } catch {
                nuevosErrores.fotoPerfil = "La URL de la foto no es válida";
            }
        }

        if (!usuarioEditado.tipoUsuario) {
            nuevosErrores.tipoUsuario = "Debés seleccionar un tipo de usuario";
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const guardarCambios = async () => {
        const esValido = validar();

        if (!esValido) return;

        await onGuardar(usuarioEditado);
    };

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
                        className={errores.descripcion ? "p-invalid" : ""}
                    />
                    {errores.descripcion && (
                        <small className="p-error">{errores.descripcion}</small>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        placeholder="Email"
                        value={usuarioEditado.email}
                        onChange={(e) => cambiarCampo("email", e.target.value)}
                        className={errores.email ? "p-invalid" : ""}
                    />
                    {errores.email && (
                        <small className="p-error">{errores.email}</small>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="celular">Celular</label>
                    <InputText
                        id="celular"
                        placeholder="Celular"
                        value={usuarioEditado.celular}
                        onChange={(e) => cambiarCampo("celular", e.target.value)}
                        className={errores.celular ? "p-invalid" : ""}
                    />
                    {errores.celular && (
                        <small className="p-error">{errores.celular}</small>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="ciudad">Ciudad</label>
                    <InputText
                        id="ciudad"
                        placeholder="Ciudad"
                        value={usuarioEditado.ciudad}
                        onChange={(e) => cambiarCampo("ciudad", e.target.value)}
                        className={errores.ciudad ? "p-invalid" : ""}
                    />
                    {errores.ciudad && (
                        <small className="p-error">{errores.ciudad}</small>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="fotoPerfil">Foto de perfil (URL)</label>
                    <InputText
                        id="fotoPerfil"
                        placeholder="URL Imagen"
                        value={usuarioEditado.fotoPerfil ?? ""}
                        onChange={(e) => cambiarCampo("fotoPerfil", e.target.value)}
                        className={errores.fotoPerfil ? "p-invalid" : ""}
                    />
                    {errores.fotoPerfil && (
                        <small className="p-error">{errores.fotoPerfil}</small>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="tipoUsuario">Tipo de perfil</label>
                    <Dropdown
                        id="tipoUsuario"
                        value={usuarioEditado.tipoUsuario}
                        options={opcionesTipoUsuario}
                        onChange={(e) => cambiarCampo("tipoUsuario", e.target.value)}
                        className={errores.tipoUsuario ? "p-invalid" : ""}
                        placeholder="Seleccioná un tipo"
                    />
                    {errores.tipoUsuario && (
                        <small className="p-error">{errores.tipoUsuario}</small>
                    )}
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
    );
};
