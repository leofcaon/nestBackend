import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { Model } from 'mongoose';
export declare class PlayersService {
    private readonly playerModel;
    constructor(playerModel: Model<Player>);
    private readonly logger;
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>;
    updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void>;
    consultAllPlayers(): Promise<Player[]>;
    consultPlayerById(_id: string): Promise<Player>;
    deletePlayer(_id: any): Promise<any>;
}
