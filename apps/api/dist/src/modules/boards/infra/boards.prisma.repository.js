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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let BoardsPrismaRepository = class BoardsPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBoardWithColumns(input) {
        return this.prisma.$transaction(async (tx) => {
            const board = await tx.board.create({
                data: {
                    name: input.name
                }
            });
            await tx.column.createMany({
                data: input.columns.map((column, index) => ({
                    name: column.name,
                    position: index + 1,
                    boardId: board.id
                }))
            });
            return tx.board.findUniqueOrThrow({
                where: { id: board.id },
                include: {
                    columns: {
                        orderBy: { position: 'asc' },
                        include: { cards: { orderBy: { position: 'asc' } } }
                    }
                }
            });
        });
    }
    async listBoards() {
        return this.prisma.board.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getBoardByIdWithNested(id) {
        return this.prisma.board.findUnique({
            where: { id },
            include: {
                columns: {
                    orderBy: { position: 'asc' },
                    include: { cards: { orderBy: { position: 'asc' } } }
                }
            }
        });
    }
};
exports.BoardsPrismaRepository = BoardsPrismaRepository;
exports.BoardsPrismaRepository = BoardsPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardsPrismaRepository);
//# sourceMappingURL=boards.prisma.repository.js.map