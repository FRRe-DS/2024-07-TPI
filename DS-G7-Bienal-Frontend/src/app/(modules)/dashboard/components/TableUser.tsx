import { AbsUser } from "@bienal/store/slices/userSlice";
import { CircleFadingArrowUp } from "lucide-react";


export async function TableUser({params}:{params:string} ){
    console.log(params)

    const users: Omit<AbsUser, 'id'>[] = [
        {
            email: 'juan@example.com',
            name: 'Juan',
            lastname: 'Pérez',
            phoneNumber: '123456789',
            dni: '12345678',
            role: 'VISITANTE'
        },
        {
            email: 'maria@example.com',
            name: 'María',
            lastname: 'García',
            phoneNumber: '987654321',
            dni: '87654321',
            role: 'VISITANTE'
        },
        {
            email: 'pedrito@example.com',
            name: 'Gengis',
            lastname: 'Kahn',
            phoneNumber: '987654321',
            dni: '87654321',
            role: 'VISITANTE'
        },
        {
            email: 'pedrito@example.com',
            name: 'Juan',
            lastname: 'Blazycowsky',
            phoneNumber: '987654321',
            dni: '87654321',
            role: 'VISITANTE'
        },
    ]

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(params.toLowerCase()) ||
        user.lastname.toLowerCase().includes(params.toLowerCase()) ||
        user.email.toLowerCase().includes(params.toLowerCase()) ||
        user.dni.toLowerCase().includes(params.toLowerCase())
    );
    

    return(
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Usuarios</h1>
            <div className="space-y-4">
                {filteredUsers.map((user) => (
                    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
                        <div className="p-4 flex justify-between items-center cursor-pointer">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{user.name} {user.lastname}</h3>
                            <p className="text-sm text-gray-600">DNI: {user.dni}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 flex items-center">
                            <CircleFadingArrowUp className="h-4 w-4 mr-2" />
                            Upgrade
                        </button> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}