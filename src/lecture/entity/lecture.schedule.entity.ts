import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { LectureStatus } from './lecture.status.entity';

@Entity()
export class LectureSchedule {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'date' })
  lectureDate: Date;

  @ManyToOne(() => Lecture, (lecture) => lecture.lectureSchedule)
  lecture: Lecture;

  @OneToMany(
    () => LectureStatus,
    (lectureStatus) => lectureStatus.lectureSchedule,
  )
  lectureStatus: LectureStatus[];
}
