import { IsDateString, IsInt, Min } from 'class-validator';
import { LectureDto } from './lecture.dto';

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

  lecture: LectureDto;
}
