import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardUseCase } from '../application/create-board.usecase';
import { GetBoardUseCase } from '../application/get-board.usecase';
import { ListBoardsUseCase } from '../application/list-boards.usecase';
import { CreateBoardDto } from './boards.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly createBoardUseCase: CreateBoardUseCase,
    private readonly listBoardsUseCase: ListBoardsUseCase,
    private readonly getBoardUseCase: GetBoardUseCase
  ) {}

  @Post()
  async create(@Body() body: CreateBoardDto) {
    return this.createBoardUseCase.execute(body);
  }

  @Get()
  async list() {
    return this.listBoardsUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getBoardUseCase.execute(id);
  }
}
