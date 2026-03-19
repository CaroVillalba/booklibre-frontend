import { useEffect, useState } from "react";
import { UsuarioDatos } from "../../components/UsuarioDatos";
import { UsuarioEstadisticas } from "../../components/UsuarioEstadisticas";
import { UsuarioHeader } from "../../components/UsuarioHeader";
import { UsuarioLibros } from "../../components/UsuarioLibros";
import "./PerfilUsuario.css";
import { type UsuarioUpdateRequest, type Usuario } from "../../../types/Usuario";
import { usuarioService } from "../../services/UsuarioService";
import { useParams } from "react-router-dom";
import { MensajePublicador } from "../../components/MensajePublicador";
import { ModalEditarPerfil } from "../../components/ModalEditarPerfil";

export const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [visibleEditarPerfil, setVisibleEditarPerfil] = useState(false);
    const [usuarioEditado, setUsuarioEditado] =
        useState<UsuarioUpdateRequest | null>(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        usuarioService
            .getById(Number(id))
            .then(setUsuario)
            .catch((error) =>
                console.error("error al cargar el usuario", error),
            )
            .finally(() => setCargando(false));
    }, [id]);

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

    return (
        <div className="p-2 surface-ground perfil-usuario">
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
                            <UsuarioEstadisticas usuarioId={usuario.id} />
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
                onGuardar={() => console.log(usuarioEditado)}
            />
        </div>
    );
};
