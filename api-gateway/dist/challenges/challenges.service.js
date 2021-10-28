"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChallengesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const players_service_1 = require("../players/players.service");
const challenge_status_enum_1 = require("./interfaces/challenge-status.enum");
const categories_service_1 = require("../categories/categories.service");
let ChallengesService = ChallengesService_1 = class ChallengesService {
    constructor(challengeModel, matchModel, playersService, categoriesService) {
        this.challengeModel = challengeModel;
        this.matchModel = matchModel;
        this.playersService = playersService;
        this.categoriesService = categoriesService;
        this.logger = new common_1.Logger(ChallengesService_1.name);
    }
    async createChallenge(createChallengeDto) {
        const players = await this.playersService.consultAllPlayers();
        createChallengeDto.players.map(playerDto => {
            const playerFilter = players.filter(player => player._id == playerDto._id);
            if (playerFilter.length == 0) {
                throw new common_1.BadRequestException(`O id ${playerDto._id} não é um jogador!`);
            }
        });
        const requesterIsPlayerOfMatch = await createChallengeDto.players.filter(player => player._id == createChallengeDto.requester);
        this.logger.log(`solicitanteEhJogadorDaPartida: ${requesterIsPlayerOfMatch}`);
        if (requesterIsPlayerOfMatch.length == 0) {
            throw new common_1.BadRequestException(`O solicitante deve ser um jogador da partida!`);
        }
        const categoryOfPlayer = await this.categoriesService.consultCategoryOfPlayer(createChallengeDto.requester);
        if (!categoryOfPlayer) {
            throw new common_1.BadRequestException(`O solicitante precisa estar registrado em uma categoria!`);
        }
        const challengeCreated = new this.challengeModel(createChallengeDto);
        challengeCreated.category = categoryOfPlayer.category;
        challengeCreated.dateHourSolicitation = new Date();
        challengeCreated.status = challenge_status_enum_1.ChallengeStatus.PENDING;
        this.logger.log(`desafioCriado: ${JSON.stringify(challengeCreated)}`);
        return await challengeCreated.save();
    }
    async consultAllChallenges() {
        return await this.challengeModel.find()
            .populate("requester")
            .populate("players")
            .populate("match")
            .exec();
    }
    async consultChallengesOfOnePlayer(_id) {
        const players = await this.playersService.consultAllPlayers();
        const playerFilter = players.filter(player => player._id == _id);
        if (playerFilter.length == 0) {
            throw new common_1.BadRequestException(`O id ${_id} não é um jogador!`);
        }
        return await this.challengeModel.find()
            .where('players')
            .in(_id)
            .populate("requester")
            .populate("players")
            .populate("match")
            .exec();
    }
    async updateChallenge(_id, updateChallengeDto) {
        const challengeFounded = await this.challengeModel.findById(_id).exec();
        if (!challengeFounded) {
            throw new common_1.NotFoundException(`Desafio ${_id} não cadastrado!`);
        }
        if (updateChallengeDto.status) {
            challengeFounded.dateHourResponse = new Date();
        }
        challengeFounded.status = updateChallengeDto.status;
        challengeFounded.dateHourChallenge = updateChallengeDto.dateHourChallenge;
        await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFounded }).exec();
    }
    async addChallengeMatch(_id, addChallengeMatchDto) {
        const challengeFounded = await this.challengeModel.findById(_id).exec();
        if (!challengeFounded) {
            throw new common_1.BadRequestException(`Desafio ${_id} não cadastrado!`);
        }
        const playerFilter = challengeFounded.players.filter(player => player._id == addChallengeMatchDto.win);
        this.logger.log(`desafioEncontrado: ${challengeFounded}`);
        this.logger.log(`jogadorFilter: ${playerFilter}`);
        if (playerFilter.length == 0) {
            throw new common_1.BadRequestException(`O jogador vencedor não faz parte do desafio!`);
        }
        const matchCreated = new this.matchModel(addChallengeMatchDto);
        matchCreated.category = challengeFounded.category;
        matchCreated.players = challengeFounded.players;
        const result = await matchCreated.save();
        challengeFounded.status = challenge_status_enum_1.ChallengeStatus.FINISHED;
        challengeFounded.match = result._id;
        try {
            await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFounded }).exec();
        }
        catch (error) {
            await this.matchModel.deleteOne({ _id: result._id }).exec();
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteChallenge(_id) {
        const challengeFounded = await this.challengeModel.findById(_id).exec();
        if (!challengeFounded) {
            throw new common_1.BadRequestException(`Desafio ${_id} não cadastrado!`);
        }
        challengeFounded.status = challenge_status_enum_1.ChallengeStatus.CANCELED;
        await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFounded }).exec();
    }
};
ChallengesService = ChallengesService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Challenge')),
    __param(1, mongoose_1.InjectModel('Match')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        players_service_1.PlayersService,
        categories_service_1.CategoriesService])
], ChallengesService);
exports.ChallengesService = ChallengesService;
//# sourceMappingURL=challenges.service.js.map