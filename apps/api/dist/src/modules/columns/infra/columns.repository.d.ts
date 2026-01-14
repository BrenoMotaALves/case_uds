export declare const COLUMNS_REPOSITORY: unique symbol;
export type CreateColumnInput = {
    boardId: string;
    name: string;
    position: number;
};
export type ColumnEntity = {
    id: string;
    name: string;
    position: number;
    boardId: string;
};
export interface ColumnsRepository {
    getLastPositionByBoard(boardId: string): Promise<number>;
    createColumn(input: CreateColumnInput): Promise<ColumnEntity>;
}
