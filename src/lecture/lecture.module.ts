import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepositoryImpl } from './interfaces/lecture.repository.Impl';
import { LECTURE_REPOSITORY } from './lecture.repository';
import { Lecture } from './entity/lecture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureStatus } from './entity/lecture.status.entity';
import { LectureOption } from './entity/lecture.option.entity';
import { LectureMapper } from './lecture.mapper';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, LectureStatus, LectureOption]),
    ReservationModule,
  ],
  controllers: [LectureController],
  providers: [
    {
      provide: LECTURE_REPOSITORY,
      useClass: LectureRepositoryImpl,
    },
    LectureService,
    LectureMapper,
  ],
  exports: [LectureService],
})
export class LectureModule {}
