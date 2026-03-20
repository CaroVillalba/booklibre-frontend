import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface MensajePublicadorProps{
    onConvertirseEnPublicador: ()=>void
}

export const MensajePublicador = ({onConvertirseEnPublicador}:MensajePublicadorProps) => {
    return (
        <Card className="border-round-2xl shadow-1">
            <div className="flex flex-column align-items-center text-center gap-3 py-5">
                <i className="pi pi-book text-4xl text-color-secondary"></i>

                <h3 className="m-0">Publicá tus libros</h3>

                <span className="text-color-secondary">
                    Convertite en publicador para gestionar tus libros, prestar
                    ejemplares y llevar el control de tu biblioteca.
                </span>

                <Button
                    label="Convertirme en publicador"
                    icon="pi pi-user-plus"
                    className="text-color p-button-primary"
                    onClick={onConvertirseEnPublicador}
                />
            </div>
        </Card>
    );
};
