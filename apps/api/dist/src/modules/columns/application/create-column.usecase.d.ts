import { PrismaService } from '../../../shared/prisma/prisma.service';
import { ColumnsRepository } from '../infra/columns.repository';
export declare class CreateColumnUseCase {
    private readonly columnsRepository;
    private readonly prisma;
    constructor(columnsRepository: ColumnsRepository, prisma: PrismaService);
    execute(input: {
        boardId: string;
        name: string;
    }): Promise<import("../infra/columns.repository").ColumnEntity>;
}
