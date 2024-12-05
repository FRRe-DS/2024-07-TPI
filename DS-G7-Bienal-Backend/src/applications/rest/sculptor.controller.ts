import { JwtRoleGuard } from "@business/auth/jwt.guard";
import { SculptorBusiness } from "@business/sculptor/sculptor.business";
import { UpdateSculptorDto } from "@dto/sculptor.dto";
import { ResponseInterface } from "@interfaces";
import { SculptorInterface } from "@interfaces/services/users.interface";
import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";

@Controller('sculptor')
export class SculptorController {
    constructor(private readonly sculptorBusiness: SculptorBusiness){}

    @Get('list')
    @UseGuards(JwtRoleGuard)
    public async getSculptors():Promise<ResponseInterface<SculptorInterface[]>> {
        return await this.sculptorBusiness.getSculptors()
    }
    
    @Patch('/:userId')
    @UseGuards(JwtRoleGuard)
    public async updateSculptor(
      @Param('userId') userId: number,
      @Body() updateData: UpdateSculptorDto
    ): Promise<ResponseInterface<any>> {
      return await this.sculptorBusiness.editSculptor(userId, updateData);
    }

}