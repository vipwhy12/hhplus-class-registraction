import { Lecture } from '../lecture/entity/lecture.entity';
import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureRepositoryImpl } from './interfaces/lecture.repository.Impl';
import { LECTURE_REPOSITORY } from './lecture.repository';
import { LectureSchedule } from './entity/lecture.schedule.entity';
import { LectureStatus } from './entity/lecture.status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, LectureStatus, LectureSchedule]),
  ],
  controllers: [LectureController],
  providers: [
    {
      provide: LECTURE_REPOSITORY,
      useClass: LectureRepositoryImpl,
    },
    LectureService,
  ],
})
export class LectureModule {}
