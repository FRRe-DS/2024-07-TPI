import { JwtRoleAdminGuard } from '@business/auth/jwt.guard';
import { UserBusiness } from '@business/users/user.business';
import { ResponseInterface } from '@interfaces';
import { UserInterface } from '@interfaces/services/users.interface';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private userBusiness : UserBusiness) {}

  @Get('list')
  @UseGuards(JwtRoleAdminGuard)
  async getUsersVisitantes():Promise<ResponseInterface<UserInterface[]>> {
    return await this.userBusiness.findAllUsersVisitantes()
  }
}

