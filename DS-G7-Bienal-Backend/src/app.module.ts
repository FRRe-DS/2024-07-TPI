import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthController } from '@rest/auth.controller';
import { RestModule } from '@rest';
import { BusinessModule } from '@business';
import { GraphQlModule } from './applications/graph-ql/graph-ql.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    RestModule,
    GraphQlModule,
    BusinessModule,
  ],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
