import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { AddChallengeMatchDto } from './dtos/add-challenge-match.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    private readonly logger;
    createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenge>;
    consultChallenges(_id: string): Promise<Array<Challenge>>;
    updateChallenge(updateChallengeDto: UpdateChallengeDto, _id: string): Promise<void>;
    addChallengeMatch(addChallengeMatchDto: AddChallengeMatchDto, _id: string): Promise<void>;
    deleteChallenge(_id: string): Promise<void>;
}
