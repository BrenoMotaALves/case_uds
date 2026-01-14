import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Implement login screen' })
  @IsString()
  @MinLength(1)
  title!: string;

  @ApiPropertyOptional({ example: 'Wireframe + UI polish' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCardDto {
  @ApiPropertyOptional({ example: 'Implement signup flow' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @ApiPropertyOptional({ example: 'Add form validations' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class MoveCardDto {
  @ApiProperty({ example: 'c2e6d93b-5c35-4c3f-8a44-2f0b7a987d9d' })
  @IsString()
  @MinLength(1)
  newColumnId!: string;
}
