"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const momentTimezone = require("moment-timezone");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    Date.prototype.toJSON = function () {
        return momentTimezone(this)
            .tz('America/Sao_Paulo')
            .format('YYYY-MM-DD HH:mm:ss.SSS');
    };
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map