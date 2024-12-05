import { Module } from '@nestjs/common';
import {
  UserRepository,
} from '@prisma';
import { Prisma } from './prisma';
import { EventsRepository } from './events.repository';
import { TematicRepository } from './tematic.repository';
import { SculptureRepository } from './sculpture.repository';
import { SculptorRepository } from './sculptor.repository';
import { ImagesRepository } from './images.repository';
import { VotesRepository } from './votes.repository';

const provider = [
  Prisma,
  UserRepository,
  EventsRepository,
  TematicRepository,
  SculptureRepository,
  SculptorRepository,
  ImagesRepository,
  VotesRepository
];

@Module({
  providers: provider,
  exports: provider,
})
export class PrismaModule {}
