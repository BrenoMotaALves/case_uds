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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_board_usecase_1 = require("../application/create-board.usecase");
const delete_board_usecase_1 = require("../application/delete-board.usecase");
const get_board_usecase_1 = require("../application/get-board.usecase");
const list_boards_usecase_1 = require("../application/list-boards.usecase");
const update_board_usecase_1 = require("../application/update-board.usecase");
const boards_dto_1 = require("./boards.dto");
let BoardsController = class BoardsController {
    constructor(createBoardUseCase, deleteBoardUseCase, listBoardsUseCase, getBoardUseCase, updateBoardUseCase) {
        this.createBoardUseCase = createBoardUseCase;
        this.deleteBoardUseCase = deleteBoardUseCase;
        this.listBoardsUseCase = listBoardsUseCase;
        this.getBoardUseCase = getBoardUseCase;
        this.updateBoardUseCase = updateBoardUseCase;
    }
    async create(body) {
        return this.createBoardUseCase.execute(body);
    }
    async list() {
        return this.listBoardsUseCase.execute();
    }
    async getById(id) {
        return this.getBoardUseCase.execute(id);
    }
    async update(id, body) {
        return this.updateBoardUseCase.execute({ id, name: body.name });
    }
    async delete(id) {
        await this.deleteBoardUseCase.execute(id);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a board' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Board created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boards_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List boards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Boards list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a board by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board detail' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update board name' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, boards_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Board deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "delete", null);
exports.BoardsController = BoardsController = __decorate([
    (0, swagger_1.ApiTags)('boards'),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [create_board_usecase_1.CreateBoardUseCase,
        delete_board_usecase_1.DeleteBoardUseCase,
        list_boards_usecase_1.ListBoardsUseCase,
        get_board_usecase_1.GetBoardUseCase,
        update_board_usecase_1.UpdateBoardUseCase])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map