import { IsInt, IsString } from 'class-validator';

export class LectureDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  lecturer: string;
}
