import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'Backlog' })
  @IsString()
  @MinLength(1)
  name!: string;
}
