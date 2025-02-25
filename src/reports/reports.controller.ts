import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AddReportDto } from './dtos/add-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  addReport(@Body() body: AddReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  approveReport(@Param("id") id: string, @Body() body: ApproveReportDto){
    const {approved} = body;
    return this.reportsService.changeApproval(id , approved)
  }
}
