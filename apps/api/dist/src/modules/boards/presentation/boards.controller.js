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
const get_board_usecase_1 = require("../application/get-board.usecase");
const list_boards_usecase_1 = require("../application/list-boards.usecase");
const boards_dto_1 = require("./boards.dto");
let BoardsController = class BoardsController {
    constructor(createBoardUseCase, listBoardsUseCase, getBoardUseCase) {
        this.createBoardUseCase = createBoardUseCase;
        this.listBoardsUseCase = listBoardsUseCase;
        this.getBoardUseCase = getBoardUseCase;
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
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boards_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getById", null);
exports.BoardsController = BoardsController = __decorate([
    (0, swagger_1.ApiTags)('boards'),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [create_board_usecase_1.CreateBoardUseCase,
        list_boards_usecase_1.ListBoardsUseCase,
        get_board_usecase_1.GetBoardUseCase])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map