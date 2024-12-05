'use client'

import { useEffect, useState } from "react";

export function EditarEscultorModal({ isOpen, onClose, escultor, onSave }: { isOpen: boolean, onClose: () => void, escultor: any, onSave: (updatedData: any) => void }) {
    const [formData, setFormData] = useState({
        name: escultor?.user?.name || "",
        lastname: escultor?.user?.lastname || "",
        phoneNumber: escultor?.user?.phoneNumber || "",
        biografia: escultor?.biografia || "",
    });

    useEffect(() => {
        if (escultor) {
            setFormData({
                name: escultor.user.name,
                lastname: escultor.user.lastname,
                phoneNumber: escultor.user.phoneNumber,
                biografia: escultor.biografia,
            });
        }
    }, [escultor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Editar Escultor</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Apellido"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleChange}
                        placeholder="Biografía"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-emerald-800 text-white rounded">Guardar</button>
                </div>
            </div>
        </div>
    );
}
