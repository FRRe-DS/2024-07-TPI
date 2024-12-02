import { BusinessModule } from '@business';
import { Module } from '@nestjs/common';
import { HealthController } from '@rest';
import { AuthController } from './auth.controller';
import { EventController } from './events.controller';
import { ImagesController } from './cloudinary.controller';
import { SculptureController } from './sculpture.controller';
import { UsersController } from './users.controller';
import { TematicController } from './tematic.controller';

@Module({
  imports: [BusinessModule],
  controllers: [TematicController,UsersController,SculptureController,ImagesController,HealthController, AuthController, EventController],
})
export class RestModule {}
