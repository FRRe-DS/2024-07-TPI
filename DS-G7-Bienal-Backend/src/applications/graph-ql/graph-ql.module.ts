import { BusinessModule } from "@business";
import { Module, Provider } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaModule } from "@prisma/prisma.module";
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ConfigService } from "@nestjs/config";
import { graphQLFactory, jwtFactory } from "@factories";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from "./user.resolver";
import { JwtStrategy } from "@business/auth/jwt.strategy";
import { QrResolver } from "./qr.resolver";


const resolver: Provider[] = [
  UserResolver,
  QrResolver
];

@Module({
  imports: [
    PrismaModule,
    BusinessModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: jwtFactory,
    }),
    GQLModule.forRootAsync<ApolloDriverConfig>({
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: graphQLFactory,
    }),
  ],
  providers: [
    JwtStrategy,
    JwtService,
    ...resolver,
  ],
})
export class GraphQlModule {}
