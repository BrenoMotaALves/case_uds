import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardUseCase } from '../application/create-card.usecase';
import { DeleteCardUseCase } from '../application/delete-card.usecase';
import { MoveCardUseCase } from '../application/move-card.usecase';
import { UpdateCardUseCase } from '../application/update-card.usecase';
import { CreateCardDto, MoveCardDto, UpdateCardDto } from './cards.dto';

@ApiTags('cards')
@Controller()
export class CardsController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly updateCardUseCase: UpdateCardUseCase,
    private readonly deleteCardUseCase: DeleteCardUseCase,
    private readonly moveCardUseCase: MoveCardUseCase
  ) {}

  @Post('columns/:columnId/cards')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a card in a column' })
  @ApiParam({ name: 'columnId', example: 'c2e6d93b-5c35-4c3f-8a44-2f0b7a987d9d' })
  @ApiResponse({ status: 201, description: 'Card created' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  async create(@Param('columnId') columnId: string, @Body() body: CreateCardDto) {
    return this.createCardUseCase.execute({
      columnId,
      title: body.title,
      description: body.description
    });
  }

  @Put('cards/:id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiParam({ name: 'id', example: 'd3f8fbb5-1d52-44be-9b1f-48ad94aefb8b' })
  @ApiResponse({ status: 200, description: 'Card updated' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async update(@Param('id') id: string, @Body() body: UpdateCardDto) {
    return this.updateCardUseCase.execute(id, {
      title: body.title,
      description: body.description
    });
  }

  @Patch('cards/:id/move')
  @ApiOperation({ summary: 'Move a card to another column' })
  @ApiParam({ name: 'id', example: 'd3f8fbb5-1d52-44be-9b1f-48ad94aefb8b' })
  @ApiResponse({ status: 200, description: 'Card moved' })
  @ApiResponse({ status: 404, description: 'Card or column not found' })
  @ApiResponse({ status: 422, description: 'Invalid move' })
  async move(@Param('id') id: string, @Body() body: MoveCardDto) {
    return this.moveCardUseCase.execute(id, body.newColumnId);
  }

  @Delete('cards/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a card' })
  @ApiParam({ name: 'id', example: 'd3f8fbb5-1d52-44be-9b1f-48ad94aefb8b' })
  @ApiResponse({ status: 204, description: 'Card deleted' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteCardUseCase.execute(id);
  }
}
