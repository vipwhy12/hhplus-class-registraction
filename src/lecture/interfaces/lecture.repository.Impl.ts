import { LectureRepository } from '../lecture.repository';
import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureOption } from '../entity/lecture.option.entity';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(
    @InjectRepository(LectureOption)
    private lectureOptionRepository: Repository<LectureOption>,
  ) {}

  // 주어진 날짜로 신청 가능한 특강 목록을 TypeORM 메서드를 이용해 조회
  async findAvailableLecturesByDate(
    lectureDate: Date,
  ): Promise<LectureOption[]> {
    return await this.lectureOptionRepository.find({
      where: {
        lectureDate: MoreThan(lectureDate),
        lectureStatus: {
          available_seats: MoreThan(0), // 좌석이 0보다 많을 때만
        },
      },
      relations: ['lecture', 'lectureStatus'], // 관계된 엔티티도 함께 로드
    });
  }
}
