import { Module } from '@nestjs/common';
import {
  UserRepository,
} from '@prisma';
import { Prisma } from './prisma';
import { EventsRepository } from './events.repository';
import { TematicRepository } from './tematic.repository';

const provider = [
  Prisma,
  UserRepository,
  EventsRepository,
  TematicRepository
];

@Module({
  providers: provider,
  exports: provider,
})
export class PrismaModule {}
