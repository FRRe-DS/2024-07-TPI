"use client";
import { useState, useEffect } from "react";
import { AbsUser } from "@bienal/store/slices/userSlice";
import { CircleFadingArrowUp } from "lucide-react";
import { UpgradeModal } from "./UpgradeModal";

export function TableUser({ params }: { params: string }) {
    const [users, setUsers] = useState<AbsUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<AbsUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedUser, setSelectedUser] = useState<AbsUser | null>(null);

    const handleModal = (user: AbsUser | null) => {
        setSelectedUser(user); 
    };

    const [reFetch, setReFetch] = useState<boolean>(false)

    const handleReFetch = () => {
        setReFetch(!reFetch)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    setError("No se encontró el token de autorización.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}users/list`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error en la solicitud: ${res.statusText}`);
                }

                const data = await res.json();
                setUsers(data.payload);
                setError(null);
            } catch (err: any) {
                setError(err.message || "Error desconocido.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [reFetch]);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                (user.name.toLowerCase().includes(params.toLowerCase()) ||
                user.lastname.toLowerCase().includes(params.toLowerCase()) ||
                user.email.toLowerCase().includes(params.toLowerCase()) ||
                user.dni.toString().toLowerCase().includes(params.toLowerCase())) && user.role !== 'ESCULTOR'
            )
        );
    }, [users, params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Cargando...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Error: {error}</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Usuarios</h1>
            <div className="space-y-4">
                {filteredUsers.map((user) => (
                    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden" key={user.email}>
                        <div className="p-4 flex flex-col md:flex-row justify-between items-center cursor-pointer">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{user.name} {user.lastname}</h3>
                                <p className="text-sm text-gray-600">DNI: {user.dni}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <button
                                onClick={() => handleModal(user)}
                                className="px-4 mt-4 md:mt-0 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 flex items-center"
                            >
                                <CircleFadingArrowUp className="h-4 w-4 mr-2" />
                                Upgrade
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <UpgradeModal user={selectedUser} reFetch={handleReFetch} closeModal={() => handleModal(null)} />
            )}
        </div>
    );
}
