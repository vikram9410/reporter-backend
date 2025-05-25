import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    example: 19.075984,
    description: 'Latitude coordinate of the issue location'
  })
  @IsDecimal()
  @IsNotEmpty()
  latitude: any;

  @ApiProperty({
    example: 72.877656,
    description: 'Longitude coordinate of the issue location'
  })
  @IsDecimal()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({
    example: 'Large pothole causing damage to vehicles',
    description: 'Detailed description of the road safety issue'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'pothole',
    description: 'Type of road safety issue (e.g., pothole, damaged road, missing sign)'
  })
  @IsString()
  @IsNotEmpty()
  issueType: string;

  @ApiProperty({
    required: false,
    description: 'URL to the image showing the issue',
    example: 'uploads/1623847291584.jpg'
  })
  @IsOptional()
  imageUrl?: string;
} 