export interface Usuario {
    id: number,
    nombre: string,
    descripcion: string
    email: string,
    celular: string,
    ciudad: string,
    tipoUsuario: TipoUsuario,
    biblioKarmas: number
}



export type TipoUsuario = 'LECTOR' | 'PUBLICADOR' | 'LECTOR_PUBLICADOR'