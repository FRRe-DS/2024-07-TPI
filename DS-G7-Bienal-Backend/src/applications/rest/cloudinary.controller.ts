import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from '@business/cloudinary/cloudinary.service';
import { JwtRoleGuard } from '@business/auth/jwt.guard';

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
});

@Controller('images')
@UseGuards(JwtRoleGuard)
export class ImagesController {
    constructor(private readonly imagesService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
        return await this.imagesService.uploadImage(file); 
    }

  
}