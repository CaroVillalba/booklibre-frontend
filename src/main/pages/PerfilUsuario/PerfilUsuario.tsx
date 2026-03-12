import { UsuarioDatos } from "../components/UsuarioDatos"
import { UsuarioEstadisticas } from "../components/UsuarioEstadisticas"
import { UsuarioHeader } from "../components/UsuarioHeader"
import { UsuarioLibros } from "../components/UsuarioLibros"
import "./PerfilUsuario.css"


export const PerfilUsuario = () => {
	return (
		<div className="p-2 surface-ground perfil-usuario" >
		
			<UsuarioHeader/>
			<div className="grid">
				<div className="col-12 lg:col-4">
					<div className="flex flex-column gap-3">

						<UsuarioDatos/>
						<UsuarioEstadisticas/>
					</div>
				</div>
				<div className="col-12 lg:col-8">
					<UsuarioLibros/>
				</div>
			</div>
		</div>
	)
}