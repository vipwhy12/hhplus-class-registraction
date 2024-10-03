import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from './reservation.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  /**
   * 사용자가 특정 수업을 신청했는지 확인하는 함수입니다.
   */
  async hasUserReservedLecture(userId: number, lectureOptionId: number) {
    const reservation = await this.reservationRepository.hasUserReservedLecture(
      userId,
      lectureOptionId,
    );

    if (reservation)
      throw new BadRequestException('이미 수강신청한 내용이 존재합니다!');
  }

  /**
   * 유저가 신청한 모든 수강 목록을 반환하는 메서드
   */
  async getReserveLectureByUserId(userId: number) {
    return await this.reservationRepository.getReserveLectureByUserId(userId);
  }

  async createReservation(
    userId: number,
    lectureOptionId: number,
    manager: EntityManager,
  ) {
    return await this.reservationRepository.createReservation(
      userId,
      lectureOptionId,
      manager,
    );
  }
}
