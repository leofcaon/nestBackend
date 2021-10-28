"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesModule = void 0;
const common_1 = require("@nestjs/common");
const challenges_controller_1 = require("./challenges.controller");
const challenges_service_1 = require("./challenges.service");
const mongoose_1 = require("@nestjs/mongoose");
const challenge_schema_1 = require("./interfaces/challenge.schema");
const match_schema_1 = require("./interfaces/match.schema");
const players_module_1 = require("../players/players.module");
const categories_module_1 = require("../categories/categories.module");
let ChallengesModule = class ChallengesModule {
};
ChallengesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Challenge', schema: challenge_schema_1.ChallengeSchema },
                { name: 'Match', schema: match_schema_1.MatchSchema }
            ]),
            players_module_1.PlayersModule,
            categories_module_1.CategoriesModule
        ],
        controllers: [challenges_controller_1.ChallengesController],
        providers: [challenges_service_1.ChallengesService],
    })
], ChallengesModule);
exports.ChallengesModule = ChallengesModule;
//# sourceMappingURL=challenges.module.js.map