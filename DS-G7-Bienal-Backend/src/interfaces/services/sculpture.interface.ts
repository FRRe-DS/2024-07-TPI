import { UserInterface } from "./users.interface";


export interface SculptureInterface{
    uuid:string,
    id:number,
    sculptor:UserInterface,
    name:string
    createdAt:Date
    description:string
    event: string
    qr?:string
    images: ImagesInterface[]
}

export type PureSculture = Omit<SculptureInterface, 'sculptor'>

/*
model Sculpture {
  id Int  @id @default(autoincrement())
  scultorId Int
  scultor Sculptor @relation(fields: [scultorId], references: [userId])
  name String
  description String
  createdAt DateTime  @default(now())
  qr String?
  images Image[]
}
  */

export interface ImagesInterface{
    id:number,
    url:string,
}