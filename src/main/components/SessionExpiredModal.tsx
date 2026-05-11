import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import './SessionExpiredModal.css'

interface SessionExpiredModalProps {
    visible: boolean
    onClose: () => void
}

export const SessionExpiredModal = ({ visible, onClose }: SessionExpiredModalProps) => {
    const navigate = useNavigate()

    const handleGoToLogin = () => {
        onClose()
        navigate('/login', { replace: true })
    }

    return (
        <Dialog
            header="Sesión vencida"
            visible={visible}
            style={{ width: '400px' }}
            modal
            closable={false}
            onHide={onClose}
        >
            <div className="session-expired-content">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: '#f59e0b' }}></i>
                <p className="session-expired-message">
                    Tu sesión ha expirado por inactividad. Por favor, volvé a iniciar sesión para continuar.
                </p>
                <Button
                    label="Ir al login"
                    icon="pi pi-sign-in"
                    onClick={handleGoToLogin}
                    className="session-expired-button"
                    autoFocus
                />
            </div>
        </Dialog>
    )
}