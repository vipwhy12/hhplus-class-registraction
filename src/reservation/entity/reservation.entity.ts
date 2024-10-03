import { Expose } from 'class-transformer';
import { LectureOption } from 'src/lecture/entity/lecture.option.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation')
export class Reservation {
  @Expose()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Expose()
  @Column({ type: 'int' })
  userId: number;

  @Expose()
  @ManyToOne(() => LectureOption)
  lectureOption: LectureOption;
}
