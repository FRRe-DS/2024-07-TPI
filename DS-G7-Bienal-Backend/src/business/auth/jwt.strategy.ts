import { UserRepository } from '@prisma';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JSON.parse(configService.get<string>('JWT_SECRET')).public_key,
      algorithms: ['ES384'],
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findByEmail(payload.email); // Asume que `sub` es el userId
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}