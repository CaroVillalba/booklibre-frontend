import "./NotFound.css"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { Card } from "primereact/card"


export const NotFound = () => {
    const navigate = useNavigate()

    const goMain = async () => {
        navigate("/")
    }

    return (
        <Card className="center">
            <h1>404: No se encontro la pagina.</h1>

            <img className="not-found-image" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fbook-with-question-mark-it-is-gray-background_1381745-2244.jpg%3Fsemt%3Dais_hybrid&sp=1775164924Tf05259cd4a3197f076b2aa54bda815954511ca1780979b34395efe3cfa9bdfee"/>

            <p>No se pudo encontrar la pagina solicitada. Es posible que el recurso haya sido movido o borrado del sistema.</p>

            <p><Button onClick={goMain}>Volver al inicio</Button></p>
        </Card>
    )
}