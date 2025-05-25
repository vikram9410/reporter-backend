import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiProperty({
    required: false,
    example: 'in-progress',
    description: 'Current status of the report (pending, in-progress, resolved)'
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    required: false,
    example: 'Updated description with additional details',
    description: 'Updated description of the road safety issue'
  })
  @IsOptional()
  @IsString()
  description?: string;
} 