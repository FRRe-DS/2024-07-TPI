import { ResponseClass } from "@handdles";
import { ResponseInterface } from "@interfaces";
import { TematicInterface } from "@interfaces/services/tematic.interface";
import { CreatedVoteInterface } from "@interfaces/services/votes.interfaces";
import { Injectable } from "@nestjs/common";
import { VotesRepository } from "@prisma/votes.repository";


@Injectable()
export class VotesBusiness extends ResponseClass{
    constructor(
        private readonly votesRepository:VotesRepository,
    ){super()}

    async canVoteSculpture(sculptureId:number, userId:number){
        const vote = await this.votesRepository.findVote(userId, sculptureId)
        if(!vote) return this.success(true)
        return this.badRequest(false)
    }

    async getSculptureVoteStats(sculptureId: number): Promise<ResponseInterface<{ count: number; average: number }>> {
        const stats = await this.votesRepository.getVoteStatsForSculpture(sculptureId);
    
        return this.success({
            count: stats.count,
            average: stats.average ?? 0,
        });
    }

    async createVote(id_user:number, id_sculpture:number, calification:number): Promise<ResponseInterface<CreatedVoteInterface>>
    {
        const vote = await this.votesRepository.createVoteSculpture(id_user, id_sculpture, calification)
        if (!vote) return this.badRequest("Error al crear el voto")
        
        let response: CreatedVoteInterface = {
            userId:vote.userId,
            sculptureId:vote.sculptureId,
            calification:vote.calification
        }
        
        return this.success(response)
    }
}