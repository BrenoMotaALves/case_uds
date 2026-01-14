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
exports.UpdateCardUseCase = void 0;
const common_1 = require("@nestjs/common");
const card_errors_1 = require("../domain/card.errors");
const cards_repository_1 = require("../infra/cards.repository");
let UpdateCardUseCase = class UpdateCardUseCase {
    constructor(cardsRepository) {
        this.cardsRepository = cardsRepository;
    }
    async execute(id, data) {
        const existing = await this.cardsRepository.findCardById(id);
        if (!existing) {
            throw new card_errors_1.CardNotFoundError(id);
        }
        return this.cardsRepository.updateCard(id, {
            title: data.title ?? existing.title,
            description: data.description ?? existing.description
        });
    }
};
exports.UpdateCardUseCase = UpdateCardUseCase;
exports.UpdateCardUseCase = UpdateCardUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cards_repository_1.CARDS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateCardUseCase);
//# sourceMappingURL=update-card.usecase.js.map