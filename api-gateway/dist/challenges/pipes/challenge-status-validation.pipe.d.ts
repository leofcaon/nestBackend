import { PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';
export declare class ChallengeStatusValidationPipe implements PipeTransform {
    readonly statusAllowed: ChallengeStatus[];
    transform(value: any): any;
    private statusValid;
}
