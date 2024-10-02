export const LECTURE_REPOSITORY = Symbol('LECTURE_REPOSITORY');

export interface LectureRepository {
  // findAvailableLecturesByDate(date: Date): Promise<lectureOptionRepository[]>;
  findAvailableLecturesByDate(date: Date);
}
