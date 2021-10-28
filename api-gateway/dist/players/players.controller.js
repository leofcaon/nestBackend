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
var PlayersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const create_player_dto_1 = require("./dtos/create-player.dto");
const update_player_dto_1 = require("./dtos/update-player.dto");
const rxjs_1 = require("rxjs");
const client_proxy_1 = require("../proxyrmq/client-proxy");
const validation_parameters_pipe_1 = require("../common/pipes/validation-parameters.pipe");
let PlayersController = PlayersController_1 = class PlayersController {
    constructor(clientProxySmartRanking) {
        this.clientProxySmartRanking = clientProxySmartRanking;
        this.logger = new common_1.Logger(PlayersController_1.name);
        this.clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();
    }
    async createPlayer(createPlayerDto) {
        this.logger.log(`createPlayerDto: ${JSON.stringify(createPlayerDto)}`);
        const category = await this.clientAdminBackend.send('consult-categories', createPlayerDto.category).toPromise();
        if (category) {
            await this.clientAdminBackend.emit('create-player', createPlayerDto);
        }
        else {
            throw new common_1.BadRequestException(`Categoria não cadastrada!`);
        }
    }
    consultPlayers(_id) {
        return this.clientAdminBackend.send('consult-players', _id ? _id : '');
    }
    async updatePlayer(updatePlayerDto, _id) {
        const category = await this.clientAdminBackend.send('consult-categories', updatePlayerDto.category).toPromise();
        if (category) {
            await this.clientAdminBackend.emit('update-player', { id: _id, player: updatePlayerDto });
        }
        else {
            throw new common_1.BadRequestException(`Categoria não cadastrada!`);
        }
    }
    async deletePlayer(_id) {
        await this.clientAdminBackend.emit('delete-player', { _id });
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
    common_1.Get(),
    __param(0, common_1.Query('idPlayerr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], PlayersController.prototype, "consultPlayers", null);
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
    common_1.Delete('/:_id'),
    __param(0, common_1.Param('_id', validation_parameters_pipe_1.ValidationParametersPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
PlayersController = PlayersController_1 = __decorate([
    common_1.Controller('players'),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxySmartRanking])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map