import { JwtAuthGuard } from '@business/auth/jwt.guard';
import { VotesBusiness } from '@business/votes/votes.business';
import { CanVoteDto, CreateVoteDto } from '@dto/votes.dto';
import { ResponseInterface } from '@interfaces';
import { TematicInterface } from '@interfaces/services/tematic.interface';
import { CreatedVoteInterface } from '@interfaces/services/votes.interfaces';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';

@Controller('votes')
export class VotesController {
  constructor(private votesBusiness : VotesBusiness) {}

  @Get('stats/:id_sculpture')
  async getStatsVotesForSculture(
    @Param('id_sculpture', ParseIntPipe) id_sculpture:number,
  ):Promise<ResponseInterface<{ count: number; average: number }>>{
    return await this.votesBusiness.getSculptureVoteStats(id_sculpture)
  }

  @Get('can-vote/:sculptureId')
  @UseGuards(JwtAuthGuard)
  async canVoteSculpture(
    @Req() req,
    @Param('sculptureId', ParseIntPipe) sculptureId:number,
  ):Promise<ResponseInterface<boolean>> {
    const userId = req.user.id
    console.log(sculptureId, userId)
    return await this.votesBusiness.canVoteSculpture(sculptureId,userId)
  }

  @Post('vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @Body(new ValidationPipe()) data: CreateVoteDto,
    @Req() req?,
  ): Promise<ResponseInterface<CreatedVoteInterface>> {
    const id_user = req.user.id;
    return await this.votesBusiness.createVote(id_user, data.id_sculpture, data.calification);
  }
}

