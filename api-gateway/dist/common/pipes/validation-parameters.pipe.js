"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationParametersPipe = void 0;
const common_1 = require("@nestjs/common");
class ValidationParametersPipe {
    transform(value, metadata) {
        if (!value) {
            throw new common_1.BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`);
        }
        return value;
    }
}
exports.ValidationParametersPipe = ValidationParametersPipe;
//# sourceMappingURL=validation-parameters.pipe.js.map