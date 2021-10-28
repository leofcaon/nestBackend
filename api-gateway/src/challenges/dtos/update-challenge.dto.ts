import { ChallengeStatus } from '../interfaces/challenge-status.enum';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateChallengeDto {

  @IsOptional()
  @IsDate()
  dateHourChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;

}
