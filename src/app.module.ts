import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureModule } from './lecture/lecture.module';
import { Lecture } from './lecture/entity/lecture.entity';
import { LectureOption } from './lecture/entity/lecture.option.entity';
import { LectureStatus } from './lecture/entity/lecture.status.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entity/reservation.entity';
import { LectureFacadeModule } from './lecture-facade/lecture-facade.module';
import { LectureFacadeController } from './lecture-facade/lecture-facade.controller';
import { LectureFacadeService } from './lecture-facade/lecture-facade.service';

@Module({
  imports: [
    LectureModule,
    ReservationModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'LectureReservation',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      // dropSchema: true,
      entities: [Lecture, LectureStatus, LectureOption, Reservation],
    }),
    LectureFacadeModule,
  ],
  controllers: [AppController, LectureFacadeController],
  providers: [AppService, LectureFacadeService],
})
export class AppModule {}
