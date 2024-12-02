import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtRoleGuard } from '@business/auth/jwt.guard';
import { SculptureBusiness } from '@business/sculptures/sculptures.business';

import { Body, Controller, Get, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateScultureRequestDto } from '@dto/sculture.dto';
import { ResponseInterface } from '@interfaces';
import { SculptureInterface } from '@interfaces/services/sculpture.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
});

@Controller('sculpture')
@UseGuards(JwtRoleGuard)
export class SculptureController {
    constructor(private readonly sculptureBussiness: SculptureBusiness) {}

    @Post('create')
    @UseGuards(JwtRoleGuard)
    @UseInterceptors(FilesInterceptor('images', 10, { storage }))

    public async createPost(
        @Req() req,
        @Body(new ValidationPipe()) createSculptureDto:CreateScultureRequestDto,
        @UploadedFiles() images:Express.Multer.File[],
    ):Promise<ResponseInterface<SculptureInterface>>{
        
        createSculptureDto.images = images
        const userId = req.user.id
        return await this.sculptureBussiness.createSculpture(createSculptureDto, userId)
    }

  
}