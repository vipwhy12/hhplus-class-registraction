import { LectureOption } from 'src/lecture/entity/lecture.option.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => LectureOption)
  lectureOption: LectureOption;
}
