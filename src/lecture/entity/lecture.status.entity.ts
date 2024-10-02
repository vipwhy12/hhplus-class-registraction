import { LectureOption } from './lecture.option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lecture_status')
export class LectureStatus {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  available_seats: number;

  @OneToOne(() => LectureOption, (option) => option.lectureStatus)
  @JoinColumn() // JoinColumn을 사용해 외래키를 설정
  lectureOption: LectureOption;
}
