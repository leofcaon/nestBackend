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
var CategoriesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const create_category_dto_1 = require("./dtos/create-category.dto");
const update_category_dto_1 = require("./dtos/update-category.dto");
const rxjs_1 = require("rxjs");
const client_proxy_1 = require("../proxyrmq/client-proxy");
let CategoriesController = CategoriesController_1 = class CategoriesController {
    constructor(clientProxySmartRanking) {
        this.clientProxySmartRanking = clientProxySmartRanking;
        this.logger = new common_1.Logger(CategoriesController_1.name);
        this.clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();
    }
    createCategory(createCategoryDto) {
        this.clientAdminBackend.emit('create-category', createCategoryDto);
    }
    consultCategories(_id) {
        return this.clientAdminBackend.send('consult-categories', _id ? _id : '');
    }
    updateCategory(updateCategoryDto, _id) {
        this.clientAdminBackend.emit('update-category', { id: _id, category: updateCategoryDto });
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('idCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CategoriesController.prototype, "consultCategories", null);
__decorate([
    common_1.Put('/:_id'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.UpdateCategoryDto, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "updateCategory", null);
CategoriesController = CategoriesController_1 = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxySmartRanking])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map