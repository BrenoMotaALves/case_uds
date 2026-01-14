import { PrismaService } from '../../../shared/prisma/prisma.service';
import { ColumnEntity, ColumnsRepository, CreateColumnInput } from './columns.repository';
export declare class ColumnsPrismaRepository implements ColumnsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLastPositionByBoard(boardId: string): Promise<number>;
    createColumn(input: CreateColumnInput): Promise<ColumnEntity>;
}
