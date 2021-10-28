import { Player } from 'src/players/interfaces/player.interface';
export declare class CreateChallengeDto {
    dateHourChallenge: Date;
    requester: Player;
    players: Array<Player>;
}
