import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBoardColumnDto {
  @ApiProperty({ example: 'Backlog' })
  @IsString()
  @MinLength(1)
  name!: string;
}

export class CreateBoardDto {
  @ApiProperty({ example: 'Product Roadmap' })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiPropertyOptional({
    type: [CreateBoardColumnDto],
    example: [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Done' }]
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBoardColumnDto)
  columns?: CreateBoardColumnDto[];
}
