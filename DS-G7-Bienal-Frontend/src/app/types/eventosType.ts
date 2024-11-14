export interface Evento {
    id:number,
    name:string,
    dateStart:Date,
    dateEnd:Date,
    lugar:string,
    descripcion:string
    tematic:Tematica
}

export interface CreateEvento {

    name:string,
    dateStart:Date,
    dateEnd:Date,
    lugar:string,
    descripcion:string
    tematic:string
}

export interface Tematica{
    id:number
    name:string
}