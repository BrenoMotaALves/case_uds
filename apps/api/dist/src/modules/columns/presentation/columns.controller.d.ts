import { CreateColumnUseCase } from '../application/create-column.usecase';
import { CreateColumnDto } from './columns.dto';
export declare class ColumnsController {
    private readonly createColumnUseCase;
    constructor(createColumnUseCase: CreateColumnUseCase);
    create(boardId: string, body: CreateColumnDto): Promise<import("../infra/columns.repository").ColumnEntity>;
}
