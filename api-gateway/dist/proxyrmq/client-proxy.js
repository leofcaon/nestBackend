"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientProxySmartRanking = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
let ClientProxySmartRanking = class ClientProxySmartRanking {
    getClientProxyAdminBackendInstance() {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://user:q7W2UQk249gR@18.210.17.173:5672/smartranking'],
                queue: 'admin-backend'
            }
        });
    }
};
ClientProxySmartRanking = __decorate([
    common_1.Injectable()
], ClientProxySmartRanking);
exports.ClientProxySmartRanking = ClientProxySmartRanking;
//# sourceMappingURL=client-proxy.js.map