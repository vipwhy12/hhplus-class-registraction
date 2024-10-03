import { LectureRepository } from '../lecture.repository';
import { Injectable } from '@nestjs/common';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureOption } from '../entity/lecture.option.entity';
import { LectureStatus } from '../entity/lecture.status.entity';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(
    @InjectRepository(LectureOption)
    private lectureOptionRepository: Repository<LectureOption>,
    @InjectRepository(LectureStatus)
    private lectureStatusRepository: Repository<LectureStatus>,
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

  async checkAvailableSeat(
    id: number,
    manager: EntityManager,
  ): Promise<LectureStatus> {
    const lectureStatusManagerRepository = manager.getRepository(LectureStatus);
    return await lectureStatusManagerRepository
      .createQueryBuilder('lectureStatus')
      .leftJoinAndSelect('lectureStatus.lectureOption', 'lectureOption')
      .where('lectureOption.id = :id', { id })
      .setLock('pessimistic_write')
      .getOne();
  }

  async updateAvailableSeat(lectureOption: number, manager: EntityManager) {
    const lectureStatusManagerRepository = manager.getRepository(LectureStatus);

    // 비관적 락을 사용하여 LectureStatus 엔티티를 잠금
    const lectureStatus = await lectureStatusManagerRepository.findOne({
      where: { lectureOption: { id: lectureOption } },
      lock: { mode: 'pessimistic_write' },
    });

    if (!lectureStatus) {
      throw new Error('Lecture status not found');
    }

    return await lectureStatusManagerRepository.decrement(
      { lectureOption: { id: lectureOption } },
      'available_seats',
      1,
    );
  }
}
