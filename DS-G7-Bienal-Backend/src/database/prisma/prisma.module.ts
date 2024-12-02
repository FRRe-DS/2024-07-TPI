import { Module } from '@nestjs/common';
import {
  UserRepository,
} from '@prisma';
import { Prisma } from './prisma';
import { EventsRepository } from './events.repository';
import { TematicRepository } from './tematic.repository';
import { SculptureRepository } from './sculpture.repository';

const provider = [
  Prisma,
  UserRepository,
  EventsRepository,
  TematicRepository,
  SculptureRepository
];

@Module({
  providers: provider,
  exports: provider,
})
export class PrismaModule {}
