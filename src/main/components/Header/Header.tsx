import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import type { MenuItem } from 'primereact/menuitem'
import './Header.css'
import { loginService } from '../../services/AuthService'

interface HeaderProps {
  bibliokarmas?: number
  usuarioNombre?: string
  onLogout?: () => void
}

export function Header({ bibliokarmas = 0, onLogout }: HeaderProps) {
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
      command: () => navigate('/perfil/1'),
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
        <Badge value={bibliokarmas} severity="warning" />
      </div>

      
      <Menu model={menuItems} popup ref={menuUsuario} />
      <Button
        icon="pi pi-user"
        className="p-button-text p-button-rounded p-button-lg"
        onClick={(e) => menuUsuario.current?.toggle(e)}
        aria-label="Menú de usuario"
      />
    </div>
  )

  return (
    <div className="header-wrapper">
      <Menubar model={navItems} start={start} end={end} className="header-menubar" />
    </div>
  )
}