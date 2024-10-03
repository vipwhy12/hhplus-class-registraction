import { IsInt, IsString, Min } from 'class-validator';
import { Lecture } from 'src/lecture/entity/lecture.entity';

export class ReservationDto {
  @Min(1)
  @IsInt()
  id: number;

  @Min(1)
  @IsInt()
  userId: number;

  @IsInt()
  lecture: Lecture;

  @IsString()
  lectureDate: string;

  @IsString()
  lectureTitle: string;

  @IsString()
  lectureCoach: string;
}
