import { Module } from '@nestjs/common';
import { LectureModule } from '../lecture/lecture.module';
import { ReservationModule } from '../reservation/reservation.module';
import { LectureFacadeController } from './lecture-facade.controller';
import { LectureFacadeService } from './lecture-facade.service';

@Module({
  imports: [LectureModule, ReservationModule],
  controllers: [LectureFacadeController],
  providers: [LectureFacadeService],
})
export class LectureFacadeModule {}
