import { Tematic } from "./tematicType"

export interface Evento {
    id:number,
    name:string,
    dateStart:Date,
    dateEnd:Date,
    lugar:string,
    descripcion:string
    tematic:Tematic
}

export interface CreateEvento {

    name:string,
    dateStart:Date,
    dateEnd:Date,
    lugar:string,
    descripcion:string
    tematic:string
}
