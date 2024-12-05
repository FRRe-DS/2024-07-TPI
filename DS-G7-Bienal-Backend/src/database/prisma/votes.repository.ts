import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { Vote } from '@prisma/client';

@Injectable()
export class VotesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getVoteStatsForSculpture(sculptureId: number): Promise<{ count: number; average: number | null }> {
        const stats = await this.prisma.vote.aggregate({
            _count: { _all: true },
            _avg: { calification: true },
            where: {
                sculptureId: sculptureId,
            },
        });
    
        return {
            count: stats._count._all,
            average: stats._avg.calification,
        };
    }

    async findVote(userId:number, sculptureId:number): Promise<Vote | null>{
        return await this.prisma.vote.findFirst({
            where: {
                userId:userId,         
                sculptureId:sculptureId,    
            },
        });
    }

    async createVoteSculpture(id_user:number, id_sculpture:number, calification:number): Promise<Vote>{
        const user = await this.prisma.user.findUnique({where:{id:id_user}})
        if(!user) throw new Error('Usuario no encontrado');
        const vote = await this.findVote(id_user, id_sculpture)
        if(vote) throw new Error('El usuario ya voto en la escultura');
        const sculpture = await this.prisma.sculpture.findUnique({where:{id:id_sculpture}})
        if(!sculpture) throw new Error('Escultura no encontrado');
        if(calification > 5 || calification < 1) throw new Error('La calificacion debe ser del 1 al 5');
        
        const responseVote = await this.prisma.vote.create({
            data:{
                userId: id_user,
                sculptureId: id_sculpture,
                calification
            }
        })

        return responseVote
    }

}
