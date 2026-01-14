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
exports.ColumnsPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let ColumnsPrismaRepository = class ColumnsPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLastPositionByBoard(boardId) {
        const column = await this.prisma.column.findFirst({
            where: { boardId },
            orderBy: { position: 'desc' },
            select: { position: true }
        });
        return column?.position ?? 0;
    }
    async createColumn(input) {
        return this.prisma.column.create({
            data: {
                boardId: input.boardId,
                name: input.name,
                position: input.position
            },
            select: {
                id: true,
                name: true,
                position: true,
                boardId: true
            }
        });
    }
};
exports.ColumnsPrismaRepository = ColumnsPrismaRepository;
exports.ColumnsPrismaRepository = ColumnsPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ColumnsPrismaRepository);
//# sourceMappingURL=columns.prisma.repository.js.map