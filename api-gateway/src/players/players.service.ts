import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { UpdatePlayerDto } from './dtos/update-player.dto'
import { Player } from './interfaces/player.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name)
    

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {

        const { email } = createPlayerDto

        const playerFounded = await this.playerModel.findOne({email}).exec();

        if (playerFounded) {
            throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado`)
        } 
            
        const playerCreated = new this.playerModel(createPlayerDto)
        return await playerCreated.save()
    
    }


    async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {

        const playerFounded = await this.playerModel.findOne({_id}).exec();

        if (!playerFounded) {
            throw new NotFoundException(`Jogadodor com id ${_id} não econtrado`)
        }

        await this.playerModel.findOneAndUpdate({_id}, 
                {$set: updatePlayerDto}).exec()
 
    }


    async consultAllPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec()
    }

    async consultPlayerById(_id: string): Promise<Player> {

        const playerFounded = await this.playerModel.findOne({_id}).exec();

        if (!playerFounded) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        
        return playerFounded

    }

    async deletePlayer(_id): Promise<any> {

        const playerFounded = await this.playerModel.findOne({_id}).exec();

        if (!playerFounded) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }

        return await this.playerModel.deleteOne({_id}).exec();
    }

}
