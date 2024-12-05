import { JwtAuthGuard, JwtRoleAdminGuard } from '@business/auth/jwt.guard';
import { UserBusiness } from '@business/users/user.business';
import { EditProfileDto } from '@dto';
import { ResponseInterface } from '@interfaces';
import { UserInterface } from '@interfaces/services/users.interface';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userBusiness : UserBusiness) {}

  @Get('list')
  @UseGuards(JwtRoleAdminGuard)
  async getUsersVisitantes():Promise<ResponseInterface<UserInterface[]>> {
    return await this.userBusiness.findAllUsersVisitantes()
  }

  @Patch('edit/:id')
  @UseGuards(JwtAuthGuard)
  async editUserProfile(
    @Param('id', ParseIntPipe) id:number,
    @Body(new ValidationPipe()) data:EditProfileDto
  ):Promise<ResponseInterface<UserInterface>>{
    
    return this.userBusiness.editUserProfile(data, id)
  }
}

