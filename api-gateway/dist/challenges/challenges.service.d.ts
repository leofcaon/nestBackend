import { Challenge, Match } from './interfaces/challenge.interface';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from 'src/players/players.service';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { AddChallengeMatchDto } from './dtos/add-challenge-match.dto';
import { CategoriesService } from 'src/categories/categories.service';
export declare class ChallengesService {
    private readonly challengeModel;
    private readonly matchModel;
    private readonly playersService;
    private readonly categoriesService;
    constructor(challengeModel: Model<Challenge>, matchModel: Model<Match>, playersService: PlayersService, categoriesService: CategoriesService);
    private readonly logger;
    createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenge>;
    consultAllChallenges(): Promise<Array<Challenge>>;
    consultChallengesOfOnePlayer(_id: any): Promise<Array<Challenge>>;
    updateChallenge(_id: string, updateChallengeDto: UpdateChallengeDto): Promise<void>;
    addChallengeMatch(_id: string, addChallengeMatchDto: AddChallengeMatchDto): Promise<void>;
    deleteChallenge(_id: string): Promise<void>;
}
