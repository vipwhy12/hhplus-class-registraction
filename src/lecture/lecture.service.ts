import { LectureMapper } from './lecture.mapper';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LectureListDto } from './dto/lecutre.list.dto';
import { LectureRepository, LECTURE_REPOSITORY } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
    private readonly lectureMapper: LectureMapper,
  ) {}

  async findAvailableLectures(date: Date): Promise<LectureListDto[]> {
    const lectures =
      await this.lectureRepository.findAvailableLecturesByDate(date);
    return this.lectureMapper.toLectureListDto(lectures);
  }

  async checkAvailableSeat(lectureOptionId: number) {
    const availableSeats =
      await this.lectureRepository.checkAvailableSeat(lectureOptionId);

    if (availableSeats <= 0)
      throw new BadRequestException('자리가 부족합니다.');
  }

  async updateAvailableSeat(lectureOptionId: number) {
    return await this.lectureRepository.updateAvailableSeat(lectureOptionId);
  }
}
