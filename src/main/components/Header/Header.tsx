import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import type { MenuItem } from 'primereact/menuitem'
import './Header.css'
import { loginService } from '../../services/AuthService'
import { usuarioService } from '../../services/UsuarioService'
import { MainContext } from '../../../types/MainContext';
import { useContext } from 'react'
import  { getMensajeError } from './../../../utils/errorHandling';
import { useOnInit } from '../../hooks/useOnInit'

interface HeaderProps {
  usuarioNombre?: string
  onLogout?: () => void
}

export function Header({ onLogout }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const menuUsuario = useRef<Menu>(null)

  

  const navItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      className: location.pathname === '/home' ? 'nav-item-active' : '',
      command: () => navigate('/home'),
    },
    {
      label: 'Mis Préstamos',
      icon: 'pi pi-book',
      className: location.pathname === '/prestamos' ? 'nav-item-active' : '',
      command: () => navigate('/prestamos'),
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      className: location.pathname === '/perfil' ? 'nav-item-active' : '',
      command: () => navigate('/perfil'),
    },
  ]

  const menuItems: MenuItem[] = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => onLogout?.(),
    },
  ]

  onLogout = () => {
    loginService.logout()
    navigate("/login")
  }

  const { showToast } = useContext(MainContext)
  const { usuario, setUsuario } = useContext(MainContext)
  
  const obtenerUsuarioHeader = async () =>{

    try {
      const usuarioId = loginService.getLoggedUser()
      const usuario = await usuarioService.getUsuarioPorId(usuarioId!)
      setUsuario(usuario)
    }
    catch( error : unknown ){
      showToast(getMensajeError(error), 'error')
    }

  } 

   useOnInit(() => {
          obtenerUsuarioHeader()
  })
  


  const start = (
    <div className="header-logo" onClick={() => navigate('/home')}>
      <span className="header-logo-icon">📚</span>
      <span className="header-logo-text">BookLibre</span>
    </div>
  )

  const end = (
    <div className="header-end">
      
      <div className="bibliokarmas-container">
        <span className="pi pi-star-fill bibliokarmas-icon" />
        <span className="bibliokarmas-label">Bibliokarmas</span>
        <Badge value={usuario?.biblioKarmas?? 0} severity="warning" />
      </div>

      
      <Menu model={menuItems} popup ref={menuUsuario} id="popup_menu_user"/>
      <Button
        icon="pi pi-user"
        className="p-button-text p-button-rounded p-button-lg"
        onClick={(e) => menuUsuario.current?.toggle(e)}
        aria-label="Menú de usuario"
        aria-controls="popup_menu_user"
        aria-haspopup
      />
    </div>
  )

  return (
    <div className="header-wrapper">
      <Menubar model={navItems} start={start} end={end} className="header-menubar" />
    </div>
  )
}