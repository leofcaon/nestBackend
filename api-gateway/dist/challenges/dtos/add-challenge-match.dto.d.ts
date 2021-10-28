import { Result } from '../interfaces/challenge.interface';
import { Player } from '../../players/interfaces/player.interface';
export declare class AddChallengeMatchDto {
    win: Player;
    result: Array<Result>;
}
