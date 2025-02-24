import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddReportDto } from './dtos/add-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  addReport(@Body() body: AddReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
