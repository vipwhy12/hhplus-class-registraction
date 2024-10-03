import { LectureOption } from 'src/lecture/entity/lecture.option.entity';

export const RESERVATION_REPOSITORY = Symbol('RESERVATION_REPOSITORY');

export interface ReservationRepository {
  getReserveLectureByUserId(userId: number);

  createReservation(userId: number, lectureOptionId: number);

  hasUserReservedLecture(userId: number, lectureOptionId: number);

  addLectureReservation(userId: number, lctureOption: LectureOption);
}
