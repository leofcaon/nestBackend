import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete, Logger } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto'
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';
import { AddChallengeMatchDto } from './dtos/add-challenge-match.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {

    constructor(private readonly challengesService: ChallengesService){}

    private readonly logger = new Logger(ChallengesController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async createChallenge(
        @Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
            this.logger.log(`createChallengeDto: ${JSON.stringify(createChallengeDto)}`)
            return await this.challengesService.createChallenge(createChallengeDto)
    }
    
    @Get()
    async consultChallenges(
        @Query('idPlayer') _id: string): Promise<Array<Challenge>> {
        return _id ? await this.challengesService.consultChallengesOfOnePlayer(_id) 
        : await this.challengesService.consultAllChallenges()
    }

    @Put('/:challenge')
    async updateChallenge(
        @Body(ChallengeStatusValidationPipe) updateChallengeDto: UpdateChallengeDto,
        @Param('challenge') _id: string): Promise<void> {
            await this.challengesService.updateChallenge(_id, updateChallengeDto)

        }    

   @Post('/:challenge/match/')
   async addChallengeMatch(
       @Body(ValidationPipe) addChallengeMatchDto: AddChallengeMatchDto,
       @Param('challenge') _id: string): Promise<void> {
        return await this.challengesService.addChallengeMatch(_id, addChallengeMatchDto)           
   }

   @Delete('/:_id')
   async deleteChallenge(
       @Param('_id') _id: string): Promise<void> {
           this.challengesService.deleteChallenge(_id)
    }

}
