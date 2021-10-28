import { IsNotEmpty } from 'class-validator';
import { Result } from '../interfaces/challenge.interface';
import { Player } from '../../players/interfaces/player.interface'


export class AddChallengeMatchDto {

  @IsNotEmpty()
  win: Player

  @IsNotEmpty()
  result: Array<Result>
  
}
