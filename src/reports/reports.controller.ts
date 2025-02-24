import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddReportDto } from './dtos/add-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  addReport(@Body() body: AddReportDto) {
    return this.reportsService.create(body)
  }
}
