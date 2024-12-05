export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phoneNumber?: string;
    role: "ADMIN" | "ESCULTOR" | "VISITANTE";
    dni?: string;
    escultor?: Sculptor;
}
export interface Sculptor {
    obrasPrevias?: string;
    biografia?: string;
    qr?: string;
}
