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
exports.CardsPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/prisma/prisma.service");
let CardsPrismaRepository = class CardsPrismaRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLastPositionByColumn(columnId) {
        const card = await this.prisma.card.findFirst({
            where: { columnId },
            orderBy: { position: 'desc' },
            select: { position: true }
        });
        return card?.position ?? 0;
    }
    async columnExists(columnId) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
            select: { id: true }
        });
        return Boolean(column);
    }
    async createCard(input) {
        return this.prisma.card.create({
            data: {
                columnId: input.columnId,
                title: input.title,
                description: input.description ?? null,
                position: input.position
            },
            select: {
                id: true,
                title: true,
                description: true,
                position: true,
                columnId: true
            }
        });
    }
    async findCardById(id) {
        return this.prisma.card.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                position: true,
                columnId: true
            }
        });
    }
    async findCardWithColumnAndBoard(id) {
        return this.prisma.card.findUnique({
            where: { id },
            select: {
                id: true,
                columnId: true,
                column: {
                    select: {
                        id: true,
                        boardId: true
                    }
                }
            }
        });
    }
    async findColumnById(id) {
        return this.prisma.column.findUnique({
            where: { id },
            select: {
                id: true,
                boardId: true
            }
        });
    }
    async moveCard(id, newColumnId, newPosition) {
        return this.prisma.card.update({
            where: { id },
            data: {
                columnId: newColumnId,
                position: newPosition
            },
            select: {
                id: true,
                title: true,
                description: true,
                position: true,
                columnId: true
            }
        });
    }
    async updateCard(id, data) {
        return this.prisma.card.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description
            },
            select: {
                id: true,
                title: true,
                description: true,
                position: true,
                columnId: true
            }
        });
    }
    async deleteCard(id) {
        await this.prisma.card.delete({
            where: { id }
        });
    }
};
exports.CardsPrismaRepository = CardsPrismaRepository;
exports.CardsPrismaRepository = CardsPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CardsPrismaRepository);
//# sourceMappingURL=cards.prisma.repository.js.map