"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const categories_module_1 = require("./categories/categories.module");
const players_module_1 = require("./players/players.module");
const client_proxy_1 = require("./proxyrmq/client-proxy");
const proxyrmq_module_1 = require("./proxyrmq/proxyrmq.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [categories_module_1.CategoriesModule, players_module_1.PlayersModule, proxyrmq_module_1.ProxyRMQModule],
        controllers: [],
        providers: [client_proxy_1.ClientProxySmartRanking],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map