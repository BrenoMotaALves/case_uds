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
exports.MoveCardUseCase = void 0;
const common_1 = require("@nestjs/common");
const card_policy_1 = require("../domain/card.policy");
const card_errors_1 = require("../domain/card.errors");
const cards_repository_1 = require("../infra/cards.repository");
let MoveCardUseCase = class MoveCardUseCase {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
    }
    async execute(cardId, newColumnId) {
        const card = await this.cardsRepository.findCardWithColumnAndBoard(cardId);
        if (!card) {
            throw new card_errors_1.CardNotFoundError(cardId);
        }
        const destinationColumn = await this.cardsRepository.findColumnById(newColumnId);
        if (!destinationColumn) {
            throw new card_errors_1.ColumnNotFoundError(newColumnId);
        }
        card_policy_1.CardPolicy.ensureCanMove(card.column.boardId, destinationColumn.boardId);
        const lastPosition = await this.cardsRepository.getLastPositionByColumn(newColumnId);
        return this.cardsRepository.moveCard(cardId, newColumnId, lastPosition + 1);
    }
};
exports.MoveCardUseCase = MoveCardUseCase;
exports.MoveCardUseCase = MoveCardUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cards_repository_1.CARDS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], MoveCardUseCase);
//# sourceMappingURL=move-card.usecase.js.map