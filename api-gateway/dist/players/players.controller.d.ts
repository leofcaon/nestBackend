import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>;
    updatePlayer(updatePlayerDto: UpdatePlayerDto, _id: string): Promise<void>;
    consultPlayers(_id: string): Promise<Player[] | Player>;
    deletePlayer(_id: string): Promise<void>;
}
