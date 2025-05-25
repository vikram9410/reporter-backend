import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Report } from './entities/report.entity';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Create a new safety report' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        latitude: { type: 'number', example: 19.075984 },
        longitude: { type: 'number', example: 72.877656 },
        description: { type: 'string', example: 'Large pothole damaging vehicles' },
        issueType: { type: 'string', example: 'pothole' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file showing the issue'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Report has been successfully created',
    type: Report
  })
  @ApiBearerAuth()
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(@Body() createReportDto: CreateReportDto, @UploadedFile() file) {
    if (file) {
      createReportDto.imageUrl = `uploads/${file.filename}`;
    }
    return this.reportsService.create(createReportDto);
  }

  @ApiOperation({ summary: 'Get all reports' })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    description: 'Filter by report status (pending, in-progress, resolved)',
    enum: ['pending', 'in-progress', 'resolved']
  })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all reports',
    type: [Report]
  })
  @ApiBearerAuth()
  @Get()
  async findAll(@Query('status') status: string) {
    return this.reportsService.findAll(status);
  }

  @ApiOperation({ summary: 'Get report hotspots (areas with high concentration of reports)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of hotspot locations',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          latitude: { type: 'number', example: 19.075984 },
          longitude: { type: 'number', example: 72.877656 },
          count: { type: 'number', example: 5 }
        }
      }
    }
  })
  @ApiBearerAuth()
  @Get('hotspots')
  async getHotspots() {
    return this.reportsService.getHotspots();
  }

  @ApiOperation({ summary: 'Get report by ID' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Found report',
    type: Report
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update report by ID' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Report has been updated',
    type: Report
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @ApiOperation({ summary: 'Delete report by ID' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({ status: 200, description: 'Report has been deleted' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
} 