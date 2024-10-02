import { IsDateString, IsInt, IsString, Min } from 'class-validator';

// 특강 목록 DTO
export class LectureListDto {
  @IsInt()
  id: number;

  @IsDateString()
  lectureDate: string;

  @IsInt()
  capacity: number;

  @IsInt()
  @Min(0)
  availableSeats: number;

  @IsString()
  title: string;

  @IsString()
  coach: string;
}
