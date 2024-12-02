import { TematicBusiness } from '@business/tematic/tematic.business';
import { ResponseInterface } from '@interfaces';
import { TematicInterface } from '@interfaces/services/tematic.interface';
import { Controller, Get } from '@nestjs/common';

@Controller('tematic')
export class TematicController {
  constructor(private tematicBusiness : TematicBusiness) {}

  @Get('list')
  async getTematicList():Promise<ResponseInterface<TematicInterface[]>> {
    return await this.tematicBusiness.listTematic()
  }
}

