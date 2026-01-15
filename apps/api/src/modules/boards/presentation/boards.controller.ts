import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBoardUseCase } from '../application/create-board.usecase';
import { DeleteBoardUseCase } from '../application/delete-board.usecase';
import { GetBoardUseCase } from '../application/get-board.usecase';
import { ListBoardsUseCase } from '../application/list-boards.usecase';
import { UpdateBoardUseCase } from '../application/update-board.usecase';
import { CreateBoardDto, UpdateBoardDto } from './boards.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly deleteBoardUseCase: DeleteBoardUseCase,
    private readonly listBoardsUseCase: ListBoardsUseCase,
    private readonly getBoardUseCase: GetBoardUseCase,
    private readonly updateBoardUseCase: UpdateBoardUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a board' })
  @ApiResponse({ status: 201, description: 'Board created' })
  async create(@Body() body: CreateBoardDto) {
    return this.createBoardUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'List boards' })
  @ApiResponse({ status: 200, description: 'Boards list' })
  async list() {
    return this.listBoardsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board by id' })
  @ApiParam({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' })
  @ApiResponse({ status: 200, description: 'Board detail' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async getById(@Param('id') id: string) {
    return this.getBoardUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update board name' })
  @ApiParam({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' })
  @ApiResponse({ status: 200, description: 'Board updated' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async update(@Param('id') id: string, @Body() body: UpdateBoardDto) {
    return this.updateBoardUseCase.execute({ id, name: body.name });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a board' })
  @ApiParam({ name: 'id', example: 'b0f1d2a3-4c5d-6e7f-8a9b-0c1d2e3f4a5b' })
  @ApiResponse({ status: 204, description: 'Board deleted' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteBoardUseCase.execute(id);
  }
}
