export type TipoUsuario = "LECTOR" | "PUBLICADOR" | "LECTOR_PUBLICADOR"

export interface Usuario{
    id?:number;
    nombre:string;
    descripcion:string;
    email:string;
    celular:string;
    ciudad:string;
    tipoUsuario:TipoUsuario;
    biblioKarmas:number;
    fotoPerfil?:string | null;
    fechaRegistro: string;
}

export interface UsuarioEstadisticasDTO{
    librosPrestados: number;
    librosLeidos: number;
}