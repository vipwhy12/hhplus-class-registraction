import { LectureOption } from 'src/lecture/entity/lecture.option.entity';

export const RESERVATION_REPOSITORY = Symbol('RESERVATION_REPOSITORY');

export interface ReservationRepository {
  createReservation(userId: number, lectureOptionId: number);
  getLectureReserveById(userId: number, lectureOptionId: number);
  addLectureReservation(userId: number, lctureOption: LectureOption);
}
