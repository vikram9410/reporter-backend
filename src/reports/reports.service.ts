import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(createReportDto);
    return this.reportsRepository.save(report);
  }

  async findAll(status?: string): Promise<Report[]> {
    if (status) {
      return this.reportsRepository.find({ where: { status } });
    }
    return this.reportsRepository.find();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportsRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);
    Object.assign(report, updateReportDto);
    return this.reportsRepository.save(report);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reportsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
  }

  async getHotspots(): Promise<any[]> {
    // This would be a more complex query in a real application
    // Here we're just grouping by latitude/longitude and counting
    const hotspots = await this.reportsRepository
      .createQueryBuilder('report')
      .select([
        'report.latitude', 
        'report.longitude', 
        'COUNT(report.id) as count'
      ])
      .groupBy('report.latitude, report.longitude')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();
    
    return hotspots;
  }
} 