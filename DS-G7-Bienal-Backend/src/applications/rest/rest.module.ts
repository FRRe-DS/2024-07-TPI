import { BusinessModule } from '@business';
import { Module } from '@nestjs/common';
import { HealthController } from '@rest';
import { AuthController } from './auth.controller';
import { EventController } from './events.controller';

@Module({
  imports: [BusinessModule],
  controllers: [HealthController, AuthController, EventController],
})
export class RestModule {}
