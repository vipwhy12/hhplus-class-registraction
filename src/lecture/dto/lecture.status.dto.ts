import { IsInt, Min } from 'class-validator';

// 특강 상태 DTO
export class LectureStatusDto {
  @IsInt()
  id: number;

  @IsInt()
  @Min(0)
  availableSeats: number;
}
