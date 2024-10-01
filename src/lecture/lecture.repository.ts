import { LectureSchedule } from './entity/lecture.schedule.entity';

export const LECTURE_REPOSITORY = Symbol('LECTURE_REPOSITORY');

export interface LectureRepository {
  findAvailableLecturesByDate(date: Date): Promise<LectureSchedule[]>;
}
