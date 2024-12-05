import { ImagesRepository } from './../../database/prisma/images.repository';
import { ImagesInterface, PureSculture } from '../../interfaces/services/sculpture.interface';
import { CloudinaryService } from '@business/cloudinary/cloudinary.service';
import { ResponseClass } from "@handdles";
import { Injectable } from "@nestjs/common";
import { EventsRepository, UserRepository } from "@prisma";
import { SculptureRepository } from '@prisma/sculpture.repository';
import { CreateScultureDto, CreateScultureRequestDto, EditScultureDto } from '@dto/sculture.dto';
import { ResponseInterface } from '@interfaces';
import { SculptureInterface } from '@interfaces/services/sculpture.interface';
import { Event, Sculpture } from '@prisma/client';
import { SculptorInterface, UserInterface } from '@interfaces/services/users.interface';
import { SculptorRepository } from '@prisma/sculptor.repository';



@Injectable()
export class SculptureBusiness extends ResponseClass{
    constructor(
        private readonly sculptureRepository:SculptureRepository,
        private readonly cloudinaryService:CloudinaryService,
        private readonly eventRepository:EventsRepository,
        private readonly userRepository:UserRepository,
        private readonly sculptorRespository:SculptorRepository,
        private readonly imagesRepository:ImagesRepository
    ){super()}

    public async deleteSculpture(sculptorId:number, sculptureId:number):Promise<ResponseInterface<string>>{
        const result = await this.sculptureRepository.deleteSculpture(sculptorId, sculptureId)
        if (result) return this.success('Borrado exitoso')
        return this.badRequest('Error al borrar')
    }

    public async editSculpture(data:EditScultureDto, uuid:string, user_id:number):Promise<ResponseInterface<PureSculture>>{
        const sculpture = await this.sculptureRepository.findSculptureByUuid(uuid)
        if(sculpture.sculptorId === user_id){
            const newSculpture = await this.sculptureRepository.editSculpture(data,uuid)
            const event = await this.eventRepository.findEventById(newSculpture.eventId)
            
            let images:ImagesInterface[] = []

            if (data.images.length > 0){
                const imagesToDelete = await this.imagesRepository.findImagesOfSculpture(newSculpture.id) 
                for (let imgDel of imagesToDelete) {
                    await this.imagesRepository.deleteImageById(imgDel.id)
                }
                for (let img of data.images) {
                    let url_img = (await this.cloudinaryService.uploadImage(img)).imageUrl
                    if (url_img) {
                        let imgObject = await this.sculptureRepository.createImage(url_img, newSculpture.id)
                        if (imgObject){
                            images.push(imgObject)
                        }
                    }
                }

            }
            if(!newSculpture) return this.badRequest("error al editar escultura")
            let response:PureSculture = {
                id:newSculpture.id,
                uuid: newSculpture.uuid,
                name: newSculpture.name,
                createdAt: newSculpture.createdAt,
                description: newSculpture.description,
                event: event.name,
                qr: newSculpture.qr,
                images:images
            }
            return this.success(response)
        }
    }

    public async getSculptureDetailForEdit(uuid:string):Promise<ResponseInterface<PureSculture>>{
        const sculpture = await this.sculptureRepository.findSculptureByUuid(uuid)
        if(!sculpture) return this.badRequest('Escultura inexistente')
        const evento:Event = await this.eventRepository.findEventById(sculpture.eventId)
        if(!evento) return this.badRequest('Evento inexistente')
        const images = await this.imagesRepository.findImagesOfSculpture(sculpture.id)

        let response:PureSculture = {
            id:sculpture.id,
            name:sculpture.name,
            uuid:sculpture.uuid,
            createdAt:sculpture.createdAt,
            description:sculpture.description,
            event:evento.name,
            qr:sculpture.qr,
            images:images
        }

        return this.success(response)
    
    }

    public async getSculptureDetail(uuid:string):Promise<ResponseInterface<SculptureInterface>>{
        const sculpture = await this.sculptureRepository.findSculptureByUuid(uuid)
        if(!sculpture) return this.badRequest('Escultura inexistente')
        const evento:Event = await this.eventRepository.findEventById(sculpture.eventId)
        if(!evento) return this.badRequest('Evento inexistente')
        let sculptor = await this.userRepository.findUserById(sculpture.sculptorId)
        
        if (!sculptor) return this.badRequest('Error, escultor no encontrado')
            
        let sculptorProfile:SculptorInterface = await this.sculptorRespository.findSculptorById(sculpture.sculptorId) as SculptorInterface
        
        let sculptorResponse:UserInterface = {
            id:sculptor.id,
            name: sculptor.name,
            lastname: sculptor.lastname,
            email: sculptor.email,
            phoneNumber: sculptor.phoneNumber,
            role: sculptor.role,
            dni: sculptor.dni,
            escultor: {
                obrasPrevias: sculptorProfile.obrasPrevias,
                biografia: sculptorProfile.biografia,
                qr: sculptorProfile.qr
            }
        }

        const images = await this.imagesRepository.findImagesOfSculpture(sculpture.id)

        let response:SculptureInterface = {
            id:sculpture.id,
            name: sculpture.name,
            uuid:sculpture.uuid,
            createdAt:sculpture.createdAt,
            description:sculpture.description,
            qr:sculpture.qr,
            images: images,
            event:evento.name,
            sculptor: sculptorResponse,
        }

        return this.success(response)
    }

    public async listSculpturesBySculptor(id_sculptor:number):Promise<ResponseInterface<PureSculture[]>>{
        const sculptures:Sculpture[] = await this.sculptureRepository.listSculpturesBySculptor(id_sculptor)
        let response:PureSculture[]=[]
        
        for (let sculp of sculptures){

            const evento:Event = await this.eventRepository.findEventById(sculp.eventId)
            if(!evento) return this.badRequest('Error, evento inexistente')
            
            const images = await this.imagesRepository.findImagesOfSculpture(sculp.id)
    
            let sculpResponse:PureSculture = {
                id:sculp.id,
                uuid:sculp.uuid,
                name:sculp.name,
                createdAt:sculp.createdAt,
                description:sculp.description,
                event:evento.name,
                images:images
            }

            response.push(sculpResponse)
        }
        
        return this.success(response)
    }

    public async listSculpturesByEvent(id_event:number): Promise<ResponseInterface<SculptureInterface[]>>{
        
        
        const sculptures:Sculpture[] = await this.sculptureRepository.listSculpturesByEvent(id_event)
        
        const evento:Event = await this.eventRepository.findEventById(id_event)
        
        
        let response:SculptureInterface[] = []
        
        for (let sculp of sculptures){
            
            let sculptor = await this.userRepository.findUserById(sculp.sculptorId)
            
            const images = await this.imagesRepository.findImagesOfSculpture(sculp.id)

            if (!sculptor) return this.badRequest('Error, escultor no encontrado')
            
            let sculptorProfile:SculptorInterface = await this.sculptorRespository.findSculptorById(sculp.sculptorId) as SculptorInterface
            
            let sculptorResponse:UserInterface = {
                id:sculptor.id,
                name: sculptor.name,
                lastname: sculptor.lastname,
                email: sculptor.email,
                phoneNumber: sculptor.phoneNumber,
                role: sculptor.role,
                dni: sculptor.dni,
                escultor: {
                    obrasPrevias: sculptorProfile.obrasPrevias,
                    biografia: sculptorProfile.biografia,
                    qr: sculptorProfile.qr
                }
            }
            

            let newSculp:SculptureInterface = {
                id:sculp.id,
                uuid:sculp.uuid,
                sculptor: sculptorResponse,
                name: sculp.name,
                createdAt: sculp.createdAt,
                description: sculp.description,
                event: evento.name,
                qr: sculp.qr,
                images: images,
            }

            response.push(newSculp)
        }

        return this.success(response)
    }

    async createSculpture(req_data:CreateScultureRequestDto, userId:number): Promise<ResponseInterface<SculptureInterface>>{
        const event = await this.eventRepository.findEventById(req_data.eventId as number)

        if (!event) return this.badRequest('Error, evento no disponible')

        const user = await this.userRepository.findUserById(userId) 

        if (!user) return this.badRequest('Error, escultor no disponible')
        
        const dataSculpture:CreateScultureDto = {
            name: req_data.name,
            eventId: event.id,
            scultorId: user.id,
            description: req_data.description,
            qr: null
        }
        
        const sculture = await this.sculptureRepository.createSculpture(dataSculpture)
        
        if (!sculture) return this.badRequest('Error al crear la escultura')

        let images:ImagesInterface[] = []

        for (let img of req_data.images) {
            let url_img = (await this.cloudinaryService.uploadImage(img)).imageUrl
            if (url_img) {
                let imgObject = await this.sculptureRepository.createImage(url_img, sculture.id)
                if (imgObject){
                    images.push(imgObject)
                }
            }
        }

        let sculptureResponse:SculptureInterface = {
            id: sculture.id,
            uuid:sculture.uuid,
            sculptor: {
                id:user.id,
                name:user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role 
            },
            name: sculture.name,
            createdAt: sculture.createdAt,
            description: sculture.description,
            event: event.name,
            images: images,
            qr:null
        }

        return this.success(sculptureResponse)
    }

}