import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Report {
  @ApiProperty({ example: 1, description: 'The unique identifier of the report' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 19.075984, description: 'Latitude coordinate of the reported location' })
  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @ApiProperty({ example: 72.877656, description: 'Longitude coordinate of the reported location' })
  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @ApiProperty({ 
    example: 'Deep pothole causing damage to vehicles', 
    description: 'Detailed description of the road safety issue' 
  })
  @Column()
  description: string;

  @ApiProperty({ 
    example: 'pothole', 
    description: 'Type of road safety issue (e.g., pothole, damaged road, missing sign)' 
  })
  @Column()
  issueType: string;

  @ApiProperty({ 
    example: 'uploads/1623847291584.jpg', 
    description: 'URL to the image showing the issue',
    required: false
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ 
    example: 'pending', 
    description: 'Current status of the report (pending, in-progress, resolved)',
    default: 'pending'
  })
  @Column({ default: 'pending' }) // pending, in-progress, resolved
  status: string;

  @ApiProperty({ 
    example: '2023-06-15T10:30:00Z', 
    description: 'Date and time when the report was created' 
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: () => User, description: 'User who submitted the report' })
  @ManyToOne(() => User, user => user.reports)
  user: User;
} 