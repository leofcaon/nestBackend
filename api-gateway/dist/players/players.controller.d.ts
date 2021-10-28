import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';
export declare class PlayersController {
    private clientProxySmartRanking;
    private logger;
    constructor(clientProxySmartRanking: ClientProxySmartRanking);
    private clientAdminBackend;
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<void>;
    consultPlayers(_id: string): Observable<any>;
    updatePlayer(updatePlayerDto: UpdatePlayerDto, _id: string): Promise<void>;
    deletePlayer(_id: string): Promise<void>;
}
