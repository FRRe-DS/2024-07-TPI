import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { Image } from '@prisma/client';

@Injectable()
export class ImagesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findImagesOfSculpture(id_sculpture:number): Promise<Image[]>{
        return this.prisma.image.findMany({where: {sculptureId:id_sculpture}})
    }

    async deleteImageById(id: number): Promise<boolean> {
        const image = await this.prisma.image.findUnique({ where: { id } });

        if (!image) {
            return false
        }

        // Borra la imagen
        await this.prisma.image.delete({ where: { id } });

        return true
    }

}
