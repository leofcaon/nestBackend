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
exports.CategoriesController = void 0;
const update_category_dto_1 = require("./dtos/update-category.dto");
const common_1 = require("@nestjs/common");
const create_category_dto_1 = require("./dtos/create-category.dto");
const categories_service_1 = require("./categories.service");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async createCategory(createCategoryDto) {
        return await this.categoriesService.createCategory(createCategoryDto);
    }
    async consultCategories(params) {
        const idCategory = params['idCategory'];
        const idPlayer = params['idPlayer'];
        if (idCategory) {
            return await this.categoriesService.consultCategoryById(idCategory);
        }
        if (idPlayer) {
            return await this.categoriesService.consultCategoryOfPlayer(idPlayer);
        }
        return await this.categoriesService.consultAllCategories();
    }
    async updateCategory(updateCategoryDto, category) {
        await this.categoriesService.updateCategory(category, updateCategoryDto);
    }
    async addCategoryToPlayer(params) {
        return await this.categoriesService.addCategoryToPlayer(params);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "consultCategories", null);
__decorate([
    common_1.Put('/:category'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.UpdateCategoryDto, String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    common_1.Post('/:category/players/:idPlayer'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "addCategoryToPlayer", null);
CategoriesController = __decorate([
    common_1.Controller('api/v1/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map