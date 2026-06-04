import { useContext, useEffect, useState } from "react";
import { UsuarioDatos } from "../../components/UsuarioDatos";
import { UsuarioEstadisticas } from "../../components/UsuarioEstadisticas";
import { UsuarioHeader } from "../../components/UsuarioHeader";
import { UsuarioLibros } from "../../components/UsuarioLibros";
import "./PerfilUsuario.css";
import {
    type UsuarioUpdateRequest,
    type Usuario,
} from "../../../types/Usuario";
import { usuarioService } from "../../services/UsuarioService";
import { MensajePublicador } from "../../components/MensajePublicador";
import { ModalEditarPerfil } from "../../components/ModalEditarPerfil";
import { AxiosError } from "axios";
import { MainContext } from "../../../types/MainContext";
import { ConfirmDialog } from "primereact/confirmdialog"
import { loginService } from "../../services/AuthService";

<ConfirmDialog />
// import { useToast } from "../../hooks/useToast";

export const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [visibleEditarPerfil, setVisibleEditarPerfil] = useState(false);
    const [usuarioEditado, setUsuarioEditado] =
        useState<UsuarioUpdateRequest | null>(null);
    const [cargando, setCargando] = useState(true)
    // const {showToast} = useToast()
    const { showToast } = useContext(MainContext);

    useEffect(() => {
    const fetchUsuario = async () => {
        try {
            const usuarioId = loginService.getLoggedUser()
            const data = await usuarioService.getById(usuarioId!)
            setUsuario(data)
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const mensaje =
                    error.response?.data?.message || "No se pudo cargar el usuario"
                showToast(mensaje, "error")
            } else {
                showToast("Error inesperado al cargar el usuario", "error")
            }
        } finally {
            setCargando(false)
        }
    }

    fetchUsuario()
}, [ showToast])

    if (cargando) {
        return <div>Cargando perfil...</div>;
    }

    if (!usuario) {
        return <div>No se pudo cargar el usuario.</div>;
    }

    const puedeGestionarLibros =
        usuario.tipoUsuario === "LECTOR_PUBLICADOR" ||
        usuario.tipoUsuario === "PUBLICADOR";

    const crearUsuarioEditado = (usuario: Usuario): UsuarioUpdateRequest => ({
        nombre: usuario.nombre,
        descripcion: usuario.descripcion,
        email: usuario.email,
        celular: usuario.celular,
        ciudad: usuario.ciudad,
        tipoUsuario: usuario.tipoUsuario,
        fotoPerfil: usuario.fotoPerfil ?? null,
    });

    const abrirEditarperfil = () => {
        setUsuarioEditado(crearUsuarioEditado(usuario));
        setVisibleEditarPerfil(true);
    };

    const cerrarModal = () => {
        setVisibleEditarPerfil(false);
        setUsuarioEditado(null);
    }

    const handleGuardarPerfil = async (
        usuarioActualizado: UsuarioUpdateRequest,
    ) => {
        if (!usuario.id) return;
        try {
            const usuarioGuardado = await usuarioService.updateUsuario(
                usuario.id,
                usuarioActualizado,
            );

            showToast("Perfil actualizado correctamente", "success");
            setUsuario(usuarioGuardado);
            cerrarModal();
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const mensaje =
                    error.response?.data?.message ||
                    "No se pudo actualizar el usuario";
                showToast(mensaje, "error");
            } else {
                showToast("Error inesperado", "error");
            }
        }
    }

    return (
        <div className="p-2 surface-ground perfil-usuario">
            <ConfirmDialog />
            <UsuarioHeader
                usuario={usuario}
                onEditarPerfil={abrirEditarperfil}
            />
            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="flex flex-column gap-3">
                        <UsuarioDatos
                            email={usuario.email}
                            celular={usuario.celular}
                            tipoUsuario={usuario.tipoUsuario}
                        />
                        {usuario.id && (
                            <UsuarioEstadisticas librosLeidos={usuario.librosLeidos} librosPrestados={usuario.librosPrestados} />
                        )}
                    </div>
                </div>
                <div className="col-12 lg:col-8">
                    {puedeGestionarLibros ? (
                        usuario.id && <UsuarioLibros usuarioId={usuario.id} />
                    ) : (
                        <MensajePublicador
                            onConvertirseEnPublicador={abrirEditarperfil}
                        />
                    )}
                </div>
            </div>
            <ModalEditarPerfil
                visible={visibleEditarPerfil}
                onHide={() => setVisibleEditarPerfil(false)}
                usuarioEditado={usuarioEditado}
                setUsuarioEditado={setUsuarioEditado}
                onGuardar={handleGuardarPerfil}
            />
        </div>
    );
};
