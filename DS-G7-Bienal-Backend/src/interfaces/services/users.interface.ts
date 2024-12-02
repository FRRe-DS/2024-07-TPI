/*interface Role {
    "VISITANTE",
    "ADMIN",
    "ESCULTOR"
}*/

import { Role } from "@prisma/client"

export interface UserInterface {
    id:number
    name:string
    lastname:string
    email:string
    phoneNumber?:string
    role: Role
    dni?:string
    escultor?:SculptorInterface
}

export interface SculptorInterface{
    obrasPrevias?:string
    biografia:string
    qr?:string
}