import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateColumnUseCase } from '../application/create-column.usecase';
import { CreateColumnDto } from './columns.dto';

@ApiTags('columns')
@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly createColumnUseCase: CreateColumnUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a column for a board' })
  @ApiParam({ name: 'boardId', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' })
  @ApiResponse({ status: 201, description: 'Column created' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async create(@Param('boardId') boardId: string, @Body() body: CreateColumnDto) {
    return this.createColumnUseCase.execute({
      boardId,
      name: body.name
    });
  }
}
