import { LectureOption } from 'src/lecture/entity/lecture.option.entity';
import { EntityManager } from 'typeorm';

export const RESERVATION_REPOSITORY = Symbol('RESERVATION_REPOSITORY');

export interface ReservationRepository {
  getReserveLectureByUserId(userId: number);

  createReservation(
    userId: number,
    lectureOptionId: number,
    manager?: EntityManager,
  );

  hasUserReservedLecture(
    userId: number,
    lectureOptionId: number,
    manager?: EntityManager,
  );

  addLectureReservation(userId: number, lctureOption: LectureOption);
}
