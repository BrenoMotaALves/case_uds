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
const health_controller_1 = require("./health.controller");
const boards_module_1 = require("./modules/boards/boards.module");
const cards_module_1 = require("./modules/cards/cards.module");
const columns_module_1 = require("./modules/columns/columns.module");
const prisma_module_1 = require("./shared/prisma/prisma.module");
const core_1 = require("@nestjs/core");
const http_exception_mapper_1 = require("./shared/errors/http-exception.mapper");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, boards_module_1.BoardsModule, columns_module_1.ColumnsModule, cards_module_1.CardsModule],
        controllers: [health_controller_1.HealthController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_mapper_1.HttpExceptionMapperFilter,
            }
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map