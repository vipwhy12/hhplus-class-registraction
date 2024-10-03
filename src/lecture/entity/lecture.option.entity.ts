import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { LectureStatus } from './lecture.status.entity';
import { Reservation } from '../../reservation/entity/reservation.entity';

@Entity('lecture_option')
export class LectureOption {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'date' })
  lectureDate: Date;

  @ManyToOne(() => Lecture, (lecture) => lecture.lectureOption)
  lecture: Lecture;

  // 1:1 관계 설정 (LectureOption은 하나의 LectureStatus를 가짐)
  @OneToOne(() => LectureStatus, (lectureStatus) => lectureStatus.lectureOption)
  lectureStatus: LectureStatus;

  @OneToMany(() => Reservation, (reservation) => reservation.lectureOption)
  reservation: Reservation[];
}
