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
exports.CreateCardUseCase = void 0;
const common_1 = require("@nestjs/common");
const card_errors_1 = require("../domain/card.errors");
const cards_repository_1 = require("../infra/cards.repository");
let CreateCardUseCase = class CreateCardUseCase {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
    }
    async execute(input) {
        const columnExists = await this.cardsRepository.columnExists(input.columnId);
        if (!columnExists) {
            throw new card_errors_1.ColumnNotFoundError(input.columnId);
        }
        const lastPosition = await this.cardsRepository.getLastPositionByColumn(input.columnId);
        const nextPosition = lastPosition + 1;
        return this.cardsRepository.createCard({
            columnId: input.columnId,
            title: input.title,
            description: input.description ?? null,
            position: nextPosition
        });
    }
};
exports.CreateCardUseCase = CreateCardUseCase;
exports.CreateCardUseCase = CreateCardUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cards_repository_1.CARDS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateCardUseCase);
//# sourceMappingURL=create-card.usecase.js.map