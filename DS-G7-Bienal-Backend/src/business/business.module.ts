import { jwtFactory } from '@factories';
import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthBusiness } from './auth/auth.business';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventBusiness } from './events/events.business';
import { SculptureBusiness } from './sculptures/sculptures.business';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserBusiness } from './users/user.business';
import { TematicBusiness } from './tematic/tematic.business';
import { VotesBusiness } from './votes/votes.business';
import { QrBusiness } from './votes/qr.business';
import { SculptorBusiness } from './sculptor/sculptor.business';

const providers: Provider<any>[] = [
  AuthBusiness,
  JwtStrategy,
  EventBusiness,
  SculptureBusiness,
  CloudinaryService,
  UserBusiness,
  TematicBusiness,
  QrBusiness,
  VotesBusiness,
  SculptorBusiness
];

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class BusinessModule {}
