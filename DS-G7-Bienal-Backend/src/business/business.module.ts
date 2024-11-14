import { jwtFactory } from '@factories';
import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthBusiness } from './auth/auth.business';
import { JwtStrategy } from './auth/jwt.strategy';
import { EventBussiness } from './events/events.business';

const providers: Provider<any>[] = [
  AuthBusiness,
  JwtStrategy,
  EventBussiness
];

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class BusinessModule {}
