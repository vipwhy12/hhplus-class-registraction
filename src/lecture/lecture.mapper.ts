import { Injectable } from '@nestjs/common';
import { LectureOption } from './entity/lecture.option.entity';
import { LectureListDto } from './dto/lecutre.list.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LectureMapper {
  toLectureListDto(lectures: LectureOption[]): LectureListDto[] {
    return plainToInstance(
      LectureListDto,
      lectures
        .filter(
          (lectureOption) => lectureOption.lectureStatus.available_seats > 0,
        )
        .map((lectureOption) => ({
          id: lectureOption.id,
          lectureDate: lectureOption.lectureDate,
          available_seats: lectureOption.lectureStatus.available_seats,
          capacity: lectureOption.capacity,
          title: lectureOption.lecture.title,
          coach: lectureOption.lecture.coach,
        })),
    );
  }
}
