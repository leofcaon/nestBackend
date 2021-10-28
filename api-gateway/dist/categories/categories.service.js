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
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const players_service_1 = require("../players/players.service");
let CategoriesService = CategoriesService_1 = class CategoriesService {
    constructor(categoryModel, playersService) {
        this.categoryModel = categoryModel;
        this.playersService = playersService;
        this.logger = new common_1.Logger(CategoriesService_1.name);
    }
    async createCategory(createCategoryDto) {
        const { category } = createCategoryDto;
        const categoryFounded = await this.categoryModel.findOne({ category }).exec();
        if (categoryFounded) {
            throw new common_1.BadRequestException(`Categoria ${category} já cadastrada!`);
        }
        const categoryCreated = new this.categoryModel(createCategoryDto);
        return await categoryCreated.save();
    }
    async consultAllCategories() {
        return await this.categoryModel.find().populate("players").exec();
    }
    async consultCategoryById(category) {
        const categoryFounded = await this.categoryModel.findOne({ category }).exec();
        if (!categoryFounded) {
            throw new common_1.NotFoundException(`Categoria ${category} não encontrada!`);
        }
        return categoryFounded;
    }
    async consultCategoryOfPlayer(idPlayer) {
        const players = await this.playersService.consultAllPlayers();
        const playerFilter = players.filter(player => player._id == idPlayer);
        if (playerFilter.length == 0) {
            throw new common_1.BadRequestException(`O id ${idPlayer} não é um jogador!`);
        }
        return await this.categoryModel.findOne().where('players').in(idPlayer).exec();
    }
    async updateCategory(category, updateCategoryDto) {
        const categoryFounded = await this.categoryModel.findOne({ category }).exec();
        if (!categoryFounded) {
            throw new common_1.NotFoundException(`Categoria ${category} não encontrada!`);
        }
        await this.categoryModel.findOneAndUpdate({ category }, { $set: updateCategoryDto }).exec();
    }
    async addCategoryToPlayer(params) {
        const category = params['category'];
        const idPlayer = params['idPlayer'];
        const categoryFounded = await this.categoryModel.findOne({ category }).exec();
        const playerRegisteredCategory = await this.categoryModel
            .findOne()
            .where('players')
            .in(idPlayer)
            .exec();
        const players = await this.playersService.consultAllPlayers();
        const playerFilter = players.filter(player => player._id == idPlayer);
        if (playerFilter.length == 0) {
            throw new common_1.BadRequestException(`O id ${idPlayer} não é um jogador!`);
        }
        if (!categoryFounded) {
            throw new common_1.BadRequestException(`Categoria ${category} não cadastrada!`);
        }
        if (playerRegisteredCategory) {
            throw new common_1.BadRequestException(`Jogador ${idPlayer} já cadastrado na Categoria ${playerRegisteredCategory.category}!`);
        }
        categoryFounded.players.push(idPlayer);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryFounded }).exec();
    }
};
CategoriesService = CategoriesService_1 = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        players_service_1.PlayersService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map