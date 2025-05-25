import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'User\'s full name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User\'s email address' })
  @Column()
  email: string;

  @ApiProperty({ description: 'User\'s password (hashed)', writeOnly: true })
  @Column()
  password: string;

  @ApiProperty({ example: 'user', description: 'User role (user or admin)', default: 'user' })
  @Column({ default: 'user' }) // 'user' or 'admin'
  role: string;

  @ApiProperty({ type: () => [Report], description: 'Reports submitted by the user' })
  @OneToMany(() => Report, report => report.user)
  reports: Report[];
} 