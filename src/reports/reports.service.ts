import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { AddReportDto } from './dtos/add-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate(estimateDto: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(limited_reports.price)', 'price') // Aggregate over subquery result
      .from(
        (subQuery) =>
          subQuery
            .select('report.price', 'price')
            .from(Report, 'report')
            .where('report.make = :make', { make: estimateDto.make })
            .andWhere('report.approved = :approved', { approved: true })
            .andWhere('report.model = :model', { model: estimateDto.model })
            .andWhere('report.lng - :lng BETWEEN -5 AND 5', {
              lng: estimateDto.lng,
            })
            .andWhere('report.lat - :lat BETWEEN -5 AND 5', {
              lat: estimateDto.lat,
            })
            .andWhere('report.year - :year BETWEEN -3 AND 3', {
              year: estimateDto.year,
            })
            .orderBy('ABS(report.mileage - :mileage)', 'DESC')
            .limit(3),
        'limited_reports',
      )
      .setParameters({ mileage: estimateDto.mileage })
      .getRawOne();
  }

  create(reportDto: AddReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }
}
