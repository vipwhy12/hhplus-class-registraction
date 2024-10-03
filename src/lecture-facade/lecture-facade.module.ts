import { Module } from '@nestjs/common';
import { LectureModule } from 'src/lecture/lecture.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { LectureFacadeController } from './lecture-facade.controller';
import { LectureFacadeService } from './lecture-facade.service';

@Module({
  imports: [LectureModule, ReservationModule],
  controllers: [LectureFacadeController],
  providers: [LectureFacadeService],
})
export class LectureFacadeModule {}
