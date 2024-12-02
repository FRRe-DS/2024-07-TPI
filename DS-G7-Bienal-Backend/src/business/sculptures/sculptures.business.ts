import { ImagesInterface } from '../../interfaces/services/sculpture.interface';
import { CloudinaryService } from '@business/cloudinary/cloudinary.service';
import { ResponseClass } from "@handdles";
import { Injectable } from "@nestjs/common";
import { EventsRepository, UserRepository } from "@prisma";
import { SculptureRepository } from '@prisma/sculpture.repository';
import { CreateScultureDto, CreateScultureRequestDto } from '@dto/sculture.dto';
import { ResponseInterface } from '@interfaces';
import { SculptureInterface } from '@interfaces/services/sculpture.interface';



@Injectable()
export class SculptureBusiness extends ResponseClass{
    constructor(
        private readonly sculptureRepository:SculptureRepository,
        private readonly cloudinaryService:CloudinaryService,
        private readonly eventRepository:EventsRepository,
        private readonly userRepository:UserRepository
    ){super()}


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