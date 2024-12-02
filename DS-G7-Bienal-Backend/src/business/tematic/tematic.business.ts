import { ResponseClass } from "@handdles";
import { ResponseInterface } from "@interfaces";
import { TematicInterface } from "@interfaces/services/tematic.interface";
import { Injectable } from "@nestjs/common";
import { TematicRepository } from "@prisma/tematic.repository";


@Injectable()
export class TematicBusiness extends ResponseClass{
    constructor(
        private readonly tematicRepository:TematicRepository,
    ){super()}

    async listTematic(): Promise<ResponseInterface<TematicInterface[]>>{
        const tematics = await this.tematicRepository.getTematic() 
        
        let response:TematicInterface[] = []
        
        for (let tematic of tematics){
            let newTematicResponse:TematicInterface = {
                id: tematic.id,
                name: tematic.name
            }
            response.push(newTematicResponse)
        }

        return this.success(response)
    }

}