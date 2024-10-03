import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from './reservation.repository';
import { LectureOption } from 'src/lecture/entity/lecture.option.entity';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
  ) {}

  //유저 아이디가 들어오면 신청한 수강목록을 반환하는 메서드
  async getLectureReserveById(userId: number, lectureOptionId: number) {
    return await this.reservationRepository.getLectureReserveById(
      userId,
      lectureOptionId,
    );
  }

  isReservation(reserveLectures) {
    if (reserveLectures)
      throw new BadRequestException('이미 수강신청한 내용이 존재합니다!');
  }

  //유저 아이디와 강의 옵션이 들어오면 신청한 수강목록을 추가하는 메서드
  async addLectureReservation(userId: number, lctureOption: LectureOption) {
    return await this.reservationRepository.addLectureReservation(
      userId,
      lctureOption,
    );
  }

  createReservation(userId: number, lectureOptionId: number) {
    return this.reservationRepository.createReservation(
      userId,
      lectureOptionId,
    );
  }
}
