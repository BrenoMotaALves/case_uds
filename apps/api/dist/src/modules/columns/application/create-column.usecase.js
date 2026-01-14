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
exports.CreateColumnUseCase = void 0;
const common_1 = require("@nestjs/common");
const board_errors_1 = require("../../boards/domain/board.errors");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
const columns_repository_1 = require("../infra/columns.repository");
let CreateColumnUseCase = class CreateColumnUseCase {
    constructor(columnsRepository, prisma) {
        this.columnsRepository = columnsRepository;
        this.prisma = prisma;
    }
    async execute(input) {
        const boardExists = await this.prisma.board.findUnique({
            where: { id: input.boardId },
            select: { id: true }
        });
        if (!boardExists) {
            throw new board_errors_1.BoardNotFoundError(input.boardId);
        }
        const lastPosition = await this.columnsRepository.getLastPositionByBoard(input.boardId);
        const nextPosition = lastPosition + 1;
        return this.columnsRepository.createColumn({
            boardId: input.boardId,
            name: input.name,
            position: nextPosition
        });
    }
};
exports.CreateColumnUseCase = CreateColumnUseCase;
exports.CreateColumnUseCase = CreateColumnUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(columns_repository_1.COLUMNS_REPOSITORY)),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], CreateColumnUseCase);
//# sourceMappingURL=create-column.usecase.js.map