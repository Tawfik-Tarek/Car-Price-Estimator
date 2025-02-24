import { IsNumber, IsString, Min, Max, min, IsLatitude, IsLongitude } from 'class-validator';

export class AddReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1970)
  @Max(2025)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsNumber()
  @Min(1000)
  @Max(1000000)
  price: number;
}
