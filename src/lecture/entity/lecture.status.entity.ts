import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LectureSchedule } from './lecture.schedule.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class LectureStatus {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  available_seats: number;

  @ManyToOne(
    () => LectureSchedule,
    (lectureSchedule) => lectureSchedule.lectureStatus,
  )
  lectureSchedule: LectureSchedule;

  @ManyToOne(() => Lecture, (lecture) => lecture.lectureStatus)
  lecture: Lecture;
}
