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
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PlayersService = PlayersService_1 = class PlayersService {
    constructor(playerModel) {
        this.playerModel = playerModel;
        this.logger = new common_1.Logger(PlayersService_1.name);
    }
    async createPlayer(createPlayerDto) {
        const { email } = createPlayerDto;
        const playerFounded = await this.playerModel.findOne({ email }).exec();
        if (playerFounded) {
            throw new common_1.BadRequestException(`Jogador com e-mail ${email} já cadastrado`);
        }
        const playerCreated = new this.playerModel(createPlayerDto);
        return await playerCreated.save();
    }
    async updatePlayer(_id, updatePlayerDto) {
        const playerFounded = await this.playerModel.findOne({ _id }).exec();
        if (!playerFounded) {
            throw new common_1.NotFoundException(`Jogadodor com id ${_id} não econtrado`);
        }
        await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto }).exec();
    }
    async consultAllPlayers() {
        return await this.playerModel.find().exec();
    }
    async consultPlayerById(_id) {
        const playerFounded = await this.playerModel.findOne({ _id }).exec();
        if (!playerFounded) {
            throw new common_1.NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        return playerFounded;
    }
    async deletePlayer(_id) {
        const playerFounded = await this.playerModel.findOne({ _id }).exec();
        if (!playerFounded) {
            throw new common_1.NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        return await this.playerModel.deleteOne({ _id }).exec();
    }
};
PlayersService = PlayersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Player')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlayersService);
exports.PlayersService = PlayersService;
//# sourceMappingURL=players.service.js.map