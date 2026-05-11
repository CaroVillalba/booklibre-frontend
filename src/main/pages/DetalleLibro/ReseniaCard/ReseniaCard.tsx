import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import type { Resenia } from '../../../../types/Resenia';

interface Props {
    resenia: Resenia
}

export const ReseniaCard = ({ resenia }: Props) => {
    return (
            <Card className="flex-1 surface-card border-round-xl shadow-1">
                <div className="flex align-items-center gap-3 mb-3">
                <div className="flex flex-column">
                    <span className="font-bold text-900">{resenia.autorNombre}</span>
                    <Rating value={resenia.rating} readOnly cancel={false} style={{ fontSize: '0.8rem' }} />
                </div>
                </div>
                    <p className="m-0 text-600 line-height-3">
                        {resenia.texto}
                    </p>
                </Card>
    )
}