import { EntityManager } from 'typeorm';
import { LectureOption } from './entity/lecture.option.entity';

export const LECTURE_REPOSITORY = Symbol('LECTURE_REPOSITORY');

export interface LectureRepository {
  findAvailableLecturesByDate(date: Date): Promise<LectureOption[]>;
  updateAvailableSeat(lectureOptionId: number, manager: EntityManager);
  checkAvailableSeat(lectureOptionId: number, manager: EntityManager);
}
