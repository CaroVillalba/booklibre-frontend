// Card que se usa para cuando el libro no tiene reseñas
import { Card } from 'primereact/card';

export const NoReseniasCard = () => {
    return (
        <Card className="flex-1 surface-card border-round-xl shadow-1">
            <p>El libro no tiene reseñas.</p>
        </Card>
    )
}