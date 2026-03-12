import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

export const UsuarioLibros = () => {
    return (
        <div>
            <div>
                <div className="flex justify-content-between align-items-center mb-2">
                    <h2 className="m-0 text-2xl">Gestión de Mis Libros</h2>
                    <Button
                        label="Agregar Nuevo Libro"
                        icon="pi pi-plus"
                        iconPos="left"
                        className="p-button-secondary p-button-outlined text-color"
                    />
                </div>
                <Card className="border-round-2xl shadow-1">
                    {/* tabs */}
                    <div className="flex gap-2">
                        <Button
                            label="Todos"
                            className="text-color p-button-primary"
                        />
                        <Button
                            label="Disponibles"
                            className="text-color"
                            outlined
                        />
                        <Button
                            label="Prestados"
                            className="text-color"
                            outlined
                        />
                    </div>
                    {/* header tabla */}
                    <div className="flex align-items-center px-3 pt-3 pb-2 border-bottom-1 surface-border justify-content-between">
                        <button className="w-5 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2">
                            <span>TÍTULO Y AUTOR</span>
                            <i className="pi pi-sort-alt"></i>
                        </button>
                        <button className="w-2 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2">
                            <span>DISPONIBLE</span>
                            <i className="pi pi-sort-alt"></i>
                        </button>
                        <button className="w-2 flex align-items-center gap-2 bg-transparent border-none cursor-pointer flex gap-2">
                            <span>AGREGADO</span>
                            <i className="pi pi-sort-alt"></i>
                        </button>
                        <div className="w-2 text-center">ACCIONES</div>
                    </div>

                    {/* libros */}
                    <div className="flex align-items-center px-3 py-2 border-bottom-1 surface-border justify-content-between">
                        {/* TITULO Y AUTOR */}
                        <div className="w-5">
                            <div className="flex align-items-center gap-3">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg"
                                    alt="El Gran Gatsby"
                                    className="perfil-libro-img"
                                />

                                <div className="flex flex-column gap-1">
                                    <span className="font-semibold">
                                        El Gran Gatsby
                                    </span>
                                    <span className="text-sm text-color-secondary">
                                        F. Scott Fitzgerald
                                    </span>
                                    <span className="text-xs text-color-secondary">
                                        Literatura Clásica
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* DISPONIBLE */}
                        <div className="w-2 flex justify-content-center">
                            <Tag
                                value="Disponible"
                                className="tag-disponible"
                            />
                        </div>

                        {/* AGREGADO */}
                        <div className="w-2 text-center">24 Oct, 2023</div>

                        {/* ACCIONES */}
                        <div className="w-2 flex justify-content-center gap-2">
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                text
                                severity="secondary"
                            />

                            <Button
                                icon="pi pi-trash"
                                rounded
                                text
                                severity="danger"
                            />
                        </div>
                    </div>
                    <div className="flex align-items-center px-3 py-2 border-bottom-1 surface-border justify-content-between">
                        {/* TITULO Y AUTOR */}
                        <div className="w-5">
                            <div className="flex align-items-center gap-3">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/I/71KilybDOoL.jpg"
                                    alt="Sistemas de Diseño"
                                    className="perfil-libro-img"
                                />

                                <div className="flex flex-column">
                                    <span className="font-semibold">
                                        Sistemas de Diseño
                                    </span>
                                    <span className="text-sm text-color-secondary">
                                        Alla Kholmatova
                                    </span>
                                    <span className="text-xs text-color-secondary">
                                        Diseño
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* DISPONIBLE */}
                        <div className="w-2 flex justify-content-center">
                            <Tag value="Prestado" className="tag-prestado" />
                        </div>

                        {/* AGREGADO */}
                        <div className="w-2 text-center">12 Sep, 2023</div>

                        {/* ACCIONES */}
                        <div className="w-2 flex justify-content-center gap-2">
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                text
                                severity="secondary"
                            />

                            <Button
                                icon="pi pi-trash"
                                rounded
                                text
                                severity="danger"
                            />
                        </div>
                    </div>
                    <div className="flex align-items-center px-3 py-2 border-bottom-1 surface-border justify-content-between">
                        {/* TITULO Y AUTOR */}
                        <div className="w-5">
                            <div className="flex align-items-center gap-3">
                                <img
                                    src="https://images-na.ssl-images-amazon.com/images/I/81F90H7hnML.jpg"
                                    alt="La Biblioteca de la Medianoche"
                                    className="perfil-libro-img"
                                />

                                <div className="flex flex-column">
                                    <span className="font-semibold">
                                        La Biblioteca de la Medianoche
                                    </span>
                                    <span className="text-sm text-color-secondary">
                                        Matt Haig
                                    </span>
                                    <span className="text-xs text-color-secondary">
                                        Ciencia Ficción
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* DISPONIBLE */}
                        <div className="w-2 flex justify-content-center">
                            <Tag
                                value="Disponible"
                                className="tag-disponible"
                            />
                        </div>

                        {/* AGREGADO */}
                        <div className="w-2 text-center">05 Ago, 2023</div>

                        {/* ACCIONES */}
                        <div className="w-2 flex justify-content-center gap-2">
                            <Button
                                icon="pi pi-pencil"
                                rounded
                                text
                                severity="secondary"
                            />

                            <Button
                                icon="pi pi-trash"
                                rounded
                                text
                                severity="danger"
                            />
                        </div>
                    </div>

                    {/* footer */}
                    <div className="flex align-items-center justify-content-between px-3 pt-2 pb-1">
                        
                        <span className="text-sm text-color-secondary">
                            Mostrando 1-3 de 12 libros
                        </span>

                        <div className="flex gap-2">
                            <Button
                                icon="pi pi-chevron-left"
                                text
                                rounded
                                severity="secondary"
                            />

                            <Button
                                icon="pi pi-chevron-right"
                                text
                                rounded
                                severity="secondary"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
