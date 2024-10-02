import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureRepositoryImpl } from './interfaces/lecture.repository.Impl';
import { LECTURE_REPOSITORY } from './lecture.repository';
import { Lecture } from './entity/lecture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureStatus } from './entity/lecture.status.entity';
import { LectureOption } from './entity/lecture.option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, LectureStatus, LectureOption])],
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
