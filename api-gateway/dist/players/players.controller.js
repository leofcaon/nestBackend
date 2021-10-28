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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const validation_parameters_pipe_1 = require("./../common/pipes/validation-parameters.pipe");
const players_service_1 = require("./players.service");
const update_player_dto_1 = require("./dtos/update-player.dto");
const create_player_dto_1 = require("./dtos/create-player.dto");
const common_1 = require("@nestjs/common");
let PlayersController = class PlayersController {
    constructor(playersService) {
        this.playersService = playersService;
    }
    async createPlayer(createPlayerDto) {
        return await this.playersService.createPlayer(createPlayerDto);
    }
    async updatePlayer(updatePlayerDto, _id) {
        await this.playersService.updatePlayer(_id, updatePlayerDto);
    }
    async consultPlayers(_id) {
        if (_id) {
            return await this.playersService.consultPlayerById(_id);
        }
        return await this.playersService.consultAllPlayers();
    }
    async deletePlayer(_id) {
        this.playersService.deletePlayer(_id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDto]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createPlayer", null);
__decorate([
    common_1.Put('/:_id'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('_id', validation_parameters_pipe_1.ValidationParametersPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_player_dto_1.UpdatePlayerDto, String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updatePlayer", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('idPlayer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "consultPlayers", null);
__decorate([
    common_1.Delete('/:_id'),
    __param(0, common_1.Param('_id', validation_parameters_pipe_1.ValidationParametersPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
PlayersController = __decorate([
    common_1.Controller('api/v1/players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map