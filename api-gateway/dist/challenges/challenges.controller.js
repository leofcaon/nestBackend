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
var ChallengesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const challenges_service_1 = require("./challenges.service");
const create_challenge_dto_1 = require("./dtos/create-challenge.dto");
const challenge_status_validation_pipe_1 = require("./pipes/challenge-status-validation.pipe");
const add_challenge_match_dto_1 = require("./dtos/add-challenge-match.dto");
const update_challenge_dto_1 = require("./dtos/update-challenge.dto");
let ChallengesController = ChallengesController_1 = class ChallengesController {
    constructor(challengesService) {
        this.challengesService = challengesService;
        this.logger = new common_1.Logger(ChallengesController_1.name);
    }
    async createChallenge(createChallengeDto) {
        this.logger.log(`createChallengeDto: ${JSON.stringify(createChallengeDto)}`);
        return await this.challengesService.createChallenge(createChallengeDto);
    }
    async consultChallenges(_id) {
        return _id ? await this.challengesService.consultChallengesOfOnePlayer(_id)
            : await this.challengesService.consultAllChallenges();
    }
    async updateChallenge(updateChallengeDto, _id) {
        await this.challengesService.updateChallenge(_id, updateChallengeDto);
    }
    async addChallengeMatch(addChallengeMatchDto, _id) {
        return await this.challengesService.addChallengeMatch(_id, addChallengeMatchDto);
    }
    async deleteChallenge(_id) {
        this.challengesService.deleteChallenge(_id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_challenge_dto_1.CreateChallengeDto]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "createChallenge", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('idPlayer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "consultChallenges", null);
__decorate([
    common_1.Put('/:challenge'),
    __param(0, common_1.Body(challenge_status_validation_pipe_1.ChallengeStatusValidationPipe)),
    __param(1, common_1.Param('challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_challenge_dto_1.UpdateChallengeDto, String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "updateChallenge", null);
__decorate([
    common_1.Post('/:challenge/match/'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, common_1.Param('challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_challenge_match_dto_1.AddChallengeMatchDto, String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "addChallengeMatch", null);
__decorate([
    common_1.Delete('/:_id'),
    __param(0, common_1.Param('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "deleteChallenge", null);
ChallengesController = ChallengesController_1 = __decorate([
    common_1.Controller('api/v1/challenges'),
    __metadata("design:paramtypes", [challenges_service_1.ChallengesService])
], ChallengesController);
exports.ChallengesController = ChallengesController;
//# sourceMappingURL=challenges.controller.js.map