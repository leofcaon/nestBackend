"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const challenge_status_enum_1 = require("../interfaces/challenge-status.enum");
class ChallengeStatusValidationPipe {
    constructor() {
        this.statusAllowed = [
            challenge_status_enum_1.ChallengeStatus.ACCEPT, challenge_status_enum_1.ChallengeStatus.DENIED,
            challenge_status_enum_1.ChallengeStatus.CANCELED
        ];
    }
    transform(value) {
        const status = value.status.toUpperCase();
        if (!this.statusValid(status)) {
            throw new common_1.BadRequestException(`${status} é um status inválido`);
        }
        return value;
    }
    statusValid(status) {
        const idx = this.statusAllowed.indexOf(status);
        return idx !== -1;
    }
}
exports.ChallengeStatusValidationPipe = ChallengeStatusValidationPipe;
//# sourceMappingURL=challenge-status-validation.pipe.js.map