import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LectureOption } from './lecture.option.entity';

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  coach: string;

  @OneToMany(() => LectureOption, (lectureOption) => lectureOption.lecture)
  lectureOption: LectureOption[];
}
