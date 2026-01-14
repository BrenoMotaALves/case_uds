"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsModule = void 0;
const common_1 = require("@nestjs/common");
const create_card_usecase_1 = require("./application/create-card.usecase");
const delete_card_usecase_1 = require("./application/delete-card.usecase");
const move_card_usecase_1 = require("./application/move-card.usecase");
const update_card_usecase_1 = require("./application/update-card.usecase");
const cards_repository_1 = require("./infra/cards.repository");
const cards_prisma_repository_1 = require("./infra/cards.prisma.repository");
const cards_controller_1 = require("./presentation/cards.controller");
let CardsModule = class CardsModule {
};
exports.CardsModule = CardsModule;
exports.CardsModule = CardsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cards_controller_1.CardsController],
        providers: [
            create_card_usecase_1.CreateCardUseCase,
            update_card_usecase_1.UpdateCardUseCase,
            delete_card_usecase_1.DeleteCardUseCase,
            move_card_usecase_1.MoveCardUseCase,
            {
                provide: cards_repository_1.CARDS_REPOSITORY,
                useClass: cards_prisma_repository_1.CardsPrismaRepository
            }
        ]
    })
], CardsModule);
//# sourceMappingURL=cards.module.js.map