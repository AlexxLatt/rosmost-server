import { IsOptional, IsString } from 'class-validator';

export class UpdateUserWithoutDto {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  passportSeries: string;

  @IsOptional()
  @IsString()
  passportCode: string;

  @IsOptional()
  @IsString()
  img: string;
}
