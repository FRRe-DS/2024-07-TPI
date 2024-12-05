import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtRoleGuard } from '@business/auth/jwt.guard';
import { SculptureBusiness } from '@business/sculptures/sculptures.business';

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateScultureDto, CreateScultureRequestDto, EditScultureDto } from '@dto/sculture.dto';
import { ResponseInterface } from '@interfaces';
import { PureSculture, SculptureInterface } from '@interfaces/services/sculpture.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    
});

@Controller('sculpture')
export class SculptureController {
    constructor(private readonly sculptureBussiness: SculptureBusiness) {}

    @Delete('delete/:sculptureId')
    @UseGuards(JwtRoleGuard)
    public async deleteSculpture(
        @Req() req,
        @Param('sculptureId', ParseIntPipe) sculptureId:number
    ):Promise<ResponseInterface<string>>{
        const sculptorId = req.user.id
        return await this.sculptureBussiness.deleteSculpture(sculptorId, sculptureId)
    }

    @Post('create')
    @UseGuards(JwtRoleGuard)
    @UseInterceptors(FilesInterceptor('images', 10, { storage }))
    public async createSculpture(
        @Req() req,
        @Body(new ValidationPipe()) createSculptureDto:CreateScultureRequestDto,
        @UploadedFiles() images:Express.Multer.File[],
    ):Promise<ResponseInterface<SculptureInterface>>{
        
        createSculptureDto.images = images
        const userId = req.user.id
        return await this.sculptureBussiness.createSculpture(createSculptureDto, userId)
    }

    @Get('detail/bounded/:uuid')
    public async getSculptureDetailBounded(@Param('uuid')uuid:string):Promise<ResponseInterface<PureSculture>> {
        return await this.sculptureBussiness.getSculptureDetailForEdit(uuid)
    }

    @Get('detail/:uuid')
    public async getSculptureDetail(@Param('uuid')uuid:string):Promise<ResponseInterface<SculptureInterface>> {
        return await this.sculptureBussiness.getSculptureDetail(uuid)
    }

    @Patch('edit/:uuid')
    @UseGuards(JwtRoleGuard)
    @UseInterceptors(FilesInterceptor('images', 10, { storage }))
    async editSculpture(
        @Req() req,
        @Param('uuid') uuid:string,
        @Body(new ValidationPipe())data:EditScultureDto,
        @UploadedFiles() images:Express.Multer.File[],
    ):Promise<ResponseInterface<PureSculture>> {
        const user_id = req.user.id
        data.images = images
        return this.sculptureBussiness.editSculpture(data, uuid, user_id)
    }

    @Get('list-by-event/:id')
    public async getSculpturesByEvent(@Param('id', ParseIntPipe)id:number):Promise<ResponseInterface<SculptureInterface[]>> {
        return await this.sculptureBussiness.listSculpturesByEvent(id)
    }
  
    @Get('list-by-sculptor/:id')
    @UseGuards(JwtRoleGuard)
    public async getSculpturesBySculptor(@Param('id', ParseIntPipe)id:number):Promise<ResponseInterface<PureSculture[]>> {
        return await this.sculptureBussiness.listSculpturesBySculptor(id)
    }



}