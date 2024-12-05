import { User } from "./usersType"

export interface Sculpture {
    uuid:string
    id:number,
    sculptor:User,
    name:string,
    createdAt:Date,
    description:string,
    event:string,
    qr:string,
    images:Images[]
}

export interface Images {
    id:number,
    url:string
}