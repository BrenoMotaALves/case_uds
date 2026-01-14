"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionMapper = void 0;
const common_1 = require("@nestjs/common");
const card_errors_1 = require("../../modules/cards/domain/card.errors");
const board_errors_1 = require("../../modules/boards/domain/board.errors");
let HttpExceptionMapper = class HttpExceptionMapper {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const body = exception.getResponse();
            response.status(status).json(body);
            return;
        }
        if (exception instanceof board_errors_1.BoardNotFoundError) {
            const notFound = new common_1.NotFoundException(exception.message);
            response.status(notFound.getStatus()).json(notFound.getResponse());
            return;
        }
        if (exception instanceof card_errors_1.ColumnNotFoundError || exception instanceof card_errors_1.CardNotFoundError) {
            const notFound = new common_1.NotFoundException(exception.message);
            response.status(notFound.getStatus()).json(notFound.getResponse());
            return;
        }
        if (exception instanceof card_errors_1.InvalidMoveError) {
            const invalidMove = new common_1.UnprocessableEntityException(exception.message);
            response.status(invalidMove.getStatus()).json(invalidMove.getResponse());
            return;
        }
        response.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
};
exports.HttpExceptionMapper = HttpExceptionMapper;
exports.HttpExceptionMapper = HttpExceptionMapper = __decorate([
    (0, common_1.Catch)()
], HttpExceptionMapper);
//# sourceMappingURL=http-exception.mapper.js.map