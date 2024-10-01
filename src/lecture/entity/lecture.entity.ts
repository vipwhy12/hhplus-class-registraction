import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LectureSchedule } from './lecture.schedule.entity';
import { LectureStatus } from './lecture.status.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  lecturer: string;

  @OneToMany(
    () => LectureSchedule,
    (lectureSchedule) => lectureSchedule.lecture,
  )
  lectureSchedule: LectureSchedule[];

  @OneToMany(() => LectureStatus, (lectureStatus) => lectureStatus.lecture)
  lectureStatus: LectureStatus[];
}
