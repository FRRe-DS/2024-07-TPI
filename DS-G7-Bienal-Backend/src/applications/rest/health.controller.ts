import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: '',
  version: '',
})
@ApiTags('')
export class HealthController {
  @Get('health/ping')
  async getStatusServerPing(): Promise<{ status: string }> {
    return { status: 'UP' };
  }

  @Get('/')
  async getStatusServer(): Promise<string> {
    return 'OK';
  }
}
