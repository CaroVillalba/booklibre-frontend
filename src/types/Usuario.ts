export type TipoUsuario = "LECTOR" | "PUBLICADOR" | "LECTOR_PUBLICADOR";

export interface Usuario {
    id: number;
    nombre: string;
    descripcion: string;
    email: string;
    celular: string;
    ciudad: string;
    tipoUsuario: TipoUsuario;
    biblioKarmas: number;
    fotoPerfil?: string | null;
    fechaRegistro: string;
    librosPrestados: number;
    librosLeidos: number;
}

export interface RegistroUsuario {
    nombre: string;
    email: string;
    password: string;
    tipoUsuario: string;
}

export interface UsuarioUpdateRequest {
    nombre: string;
    descripcion: string;
    email: string;
    celular: string;
    ciudad: string;
    tipoUsuario: TipoUsuario;
    fotoPerfil?: string | null;
}
export interface LoginUsuario {
    email: string;
    password: string;
    rememberMe: boolean;
}
