import { ValidationParametersPipe } from './../common/pipes/validation-parameters.pipe';
import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, Query } from '@nestjs/common';
import { Player } from './interfaces/player.interface'

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playersService.createPlayer(createPlayerDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto, 
        @Param('_id', ValidationParametersPipe) _id: string): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayerDto)
    }

    @Get()
    async consultPlayers(
        @Query('idPlayer') _id: string): Promise<Player[] | Player> {
        
        if (_id) {
            return await this.playersService.consultPlayerById(_id);
        }
            
        return await this.playersService.consultAllPlayers();      
    }

    @Delete('/:_id')
    async deletePlayer(
        @Param('_id', ValidationParametersPipe) _id: string): Promise<void> {
            this.playersService.deletePlayer(_id)
        }

}
