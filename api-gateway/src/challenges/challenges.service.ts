import { Injectable, NotFoundException, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge, Match } from './interfaces/challenge.interface';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from 'src/players/players.service';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AddChallengeMatchDto } from './dtos/add-challenge-match.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ChallengesService {

    constructor(
        @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
        @InjectModel('Match') private readonly matchModel: Model<Match>,
        private readonly playersService: PlayersService,
        private readonly categoriesService: CategoriesService) {}

        private readonly logger = new Logger(ChallengesService.name)

    async createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenge> {

        const players = await this.playersService.consultAllPlayers()

        createChallengeDto.players.map(playerDto => {
            const playerFilter = players.filter( player => player._id == playerDto._id )

            if (playerFilter.length == 0) {
                throw new BadRequestException(`O id ${playerDto._id} não é um jogador!`)
            }
        
        })
          
        const requesterIsPlayerOfMatch = await createChallengeDto.players.filter(player => player._id == createChallengeDto.requester)

        this.logger.log(`solicitanteEhJogadorDaPartida: ${requesterIsPlayerOfMatch}`)

        if(requesterIsPlayerOfMatch.length == 0) {
            throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
        }

        const categoryOfPlayer = await this.categoriesService.consultCategoryOfPlayer(createChallengeDto.requester)

        if (!categoryOfPlayer) {
            throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
        }

        const challengeCreated = new this.challengeModel(createChallengeDto)
        challengeCreated.category = categoryOfPlayer.category
        challengeCreated.dateHourSolicitation = new Date()

        challengeCreated.status = ChallengeStatus.PENDING
        this.logger.log(`desafioCriado: ${JSON.stringify(challengeCreated)}`)
        return await challengeCreated.save()

    }

    async consultAllChallenges(): Promise<Array<Challenge>> {
        return await this.challengeModel.find()
        .populate("requester")
        .populate("players")
        .populate("match")
        .exec()
    }

    async consultChallengesOfOnePlayer(_id: any): Promise<Array<Challenge>> {

       const players = await this.playersService.consultAllPlayers()

        const playerFilter = players.filter( player => player._id == _id )

        if (playerFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }

        return await this.challengeModel.find()
        .where('players')
        .in(_id)
        .populate("requester")
        .populate("players")
        .populate("match")
        .exec()

    }

    async updateChallenge(_id: string, updateChallengeDto: UpdateChallengeDto): Promise<void> {
   
        const challengeFounded = await this.challengeModel.findById(_id).exec()

        if (!challengeFounded) {
            throw new NotFoundException(`Desafio ${_id} não cadastrado!`)
        }

        if (updateChallengeDto.status){
           challengeFounded.dateHourResponse = new Date()         
        }
        challengeFounded.status = updateChallengeDto.status
        challengeFounded.dateHourChallenge = updateChallengeDto.dateHourChallenge

        await this.challengeModel.findOneAndUpdate({_id},{$set: challengeFounded}).exec()
        
    }

    async addChallengeMatch(_id: string, addChallengeMatchDto: AddChallengeMatchDto ): Promise<void> {

        const challengeFounded = await this.challengeModel.findById(_id).exec()
        
        if (!challengeFounded) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }

        const playerFilter = challengeFounded.players.filter( player => player._id == addChallengeMatchDto.win )

        this.logger.log(`desafioEncontrado: ${challengeFounded}`)
        this.logger.log(`jogadorFilter: ${playerFilter}`)

       if (playerFilter.length == 0) {
           throw new BadRequestException(`O jogador vencedor não faz parte do desafio!`)
       }

       const matchCreated = new this.matchModel(addChallengeMatchDto)

       matchCreated.category = challengeFounded.category

       matchCreated.players = challengeFounded.players

       const result = await matchCreated.save()
       
        challengeFounded.status = ChallengeStatus.FINISHED

        challengeFounded.match = result._id

        try {
        await this.challengeModel.findOneAndUpdate({_id},{$set: challengeFounded}).exec() 
        } catch (error) {

           await this.matchModel.deleteOne({_id: result._id}).exec();
           throw new InternalServerErrorException()
        }
    }

    async deleteChallenge(_id: string): Promise<void> {

        const challengeFounded = await this.challengeModel.findById(_id).exec()

        if (!challengeFounded) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }
        
        challengeFounded.status = ChallengeStatus.CANCELED

       await this.challengeModel.findOneAndUpdate({_id},{$set: challengeFounded}).exec() 

    }

}
