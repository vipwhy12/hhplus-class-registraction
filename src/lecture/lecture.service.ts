import { LectureMapper } from './lecture.mapper';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LectureListDto } from './dto/lecutre.list.dto';
import { LectureRepository, LECTURE_REPOSITORY } from './lecture.repository';
import { EntityManager } from 'typeorm';

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

  async checkAvailableSeat(
    lectureOptionId: number,
    manager: EntityManager,
    userId: number,
  ) {
    const lectureStatus = await this.lectureRepository.checkAvailableSeat(
      lectureOptionId,
      manager,
    );

    console.log(
      `userId: ${userId}, availableSeats: ${lectureStatus.available_seats}`,
    );

    if (lectureStatus.available_seats < 1)
      throw new BadRequestException('자리가 부족합니다.');
  }

  async updateAvailableSeat(lectureOptionId: number, manager: EntityManager) {
    return await this.lectureRepository.updateAvailableSeat(
      lectureOptionId,
      manager,
    );
  }
}
