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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_column_usecase_1 = require("../application/create-column.usecase");
const columns_dto_1 = require("./columns.dto");
let ColumnsController = class ColumnsController {
    constructor(createColumnUseCase) {
        this.createColumnUseCase = createColumnUseCase;
    }
    async create(boardId, body) {
        return this.createColumnUseCase.execute({
            boardId,
            name: body.name
        });
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Create a column for a board' }),
    (0, swagger_1.ApiParam)({ name: 'boardId', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Column created' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, columns_dto_1.CreateColumnDto]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "create", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, swagger_1.ApiTags)('columns'),
    (0, common_1.Controller)('boards/:boardId/columns'),
    __metadata("design:paramtypes", [create_column_usecase_1.CreateColumnUseCase])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map