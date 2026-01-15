"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const create_board_usecase_1 = require("./application/create-board.usecase");
const delete_board_usecase_1 = require("./application/delete-board.usecase");
const get_board_usecase_1 = require("./application/get-board.usecase");
const list_boards_usecase_1 = require("./application/list-boards.usecase");
const update_board_usecase_1 = require("./application/update-board.usecase");
const boards_prisma_repository_1 = require("./infra/boards.prisma.repository");
const boards_repository_1 = require("./infra/boards.repository");
const boards_controller_1 = require("./presentation/boards.controller");
let BoardsModule = class BoardsModule {
};
exports.BoardsModule = BoardsModule;
exports.BoardsModule = BoardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boards_controller_1.BoardsController],
        providers: [
            create_board_usecase_1.CreateBoardUseCase,
            delete_board_usecase_1.DeleteBoardUseCase,
            get_board_usecase_1.GetBoardUseCase,
            list_boards_usecase_1.ListBoardsUseCase,
            update_board_usecase_1.UpdateBoardUseCase,
            {
                provide: boards_repository_1.BOARDS_REPOSITORY,
                useClass: boards_prisma_repository_1.BoardsPrismaRepository
            }
        ]
    })
], BoardsModule);
//# sourceMappingURL=boards.module.js.map