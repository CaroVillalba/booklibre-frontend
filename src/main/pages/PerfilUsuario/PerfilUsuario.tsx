import { useEffect, useState } from "react"
import { UsuarioDatos } from "../../components/UsuarioDatos"
import { UsuarioEstadisticas } from "../../components/UsuarioEstadisticas"
import { UsuarioHeader } from "../../components/UsuarioHeader"
import { UsuarioLibros } from "../../components/UsuarioLibros"
import "./PerfilUsuario.css"
import type { Usuario } from "../../../types/Usuario"
import { usuarioService } from "../../services/UsuarioService"
import { useParams } from "react-router-dom"


export const PerfilUsuario = () => {
	const [usuario,setUsuario] = useState<Usuario | null>(null)
	const [cargando, setCargando] = useState(true)
	const {id} = useParams()

	useEffect(()=>{
		
		usuarioService.getById(Number(id))
			.then((usuarioBackend) => setUsuario(usuarioBackend))
			.catch((error)=> console.error("error al cargar el usuario" , error))
			.finally(()=> setCargando(false))
		
	},[id])

	if(cargando){
		return <div>Cargando perfil...</div>
	}

	if(!usuario){
		return <div>No se pudo cargar el usuario.</div>
	}

	return (
		<div className="p-2 surface-ground perfil-usuario" >
		
			<UsuarioHeader usuario={usuario}/>
			<div className="grid">
				<div className="col-12 lg:col-4">
					<div className="flex flex-column gap-3">

						<UsuarioDatos email={usuario.email} celular={usuario.celular} tipoUsuario={usuario.tipoUsuario}/>
						{usuario.id && (<UsuarioEstadisticas usuarioId={usuario.id}/>)}
					</div>
				</div>
				<div className="col-12 lg:col-8">
					<UsuarioLibros/>
				</div>
			</div>
		</div>
	)
}