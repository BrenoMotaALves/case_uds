import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';
import {
  CardNotFoundError,
  ColumnNotFoundError,
  InvalidMoveError
} from '../../modules/cards/domain/card.errors';
import { BoardNotFoundError } from '../../modules/boards/domain/board.errors';

@Catch()
export class HttpExceptionMapperFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      response.status(status).json(body);
      return;
    }

    if (exception instanceof BoardNotFoundError) {
      response.status(404).json({ message: exception.message });
      return;
    }

    if (exception instanceof ColumnNotFoundError || exception instanceof CardNotFoundError) {
      response.status(404).json({ message: exception.message });
      return;
    }

    if (exception instanceof InvalidMoveError) {
      response.status(422).json({ message: exception.message });
      return;
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
}
