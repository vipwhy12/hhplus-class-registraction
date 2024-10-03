import { IsInt } from 'class-validator';

export class ApplyForLectureDto {
  @IsInt()
  lectureOptionId: number;

  @IsInt()
  userId: number;
}
