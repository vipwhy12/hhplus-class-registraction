import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './lecture/entity/lecture.entity';
import { LectureModule } from './lecture/lecture.module';
import { LectureSchedule } from './lecture/entity/lecture.schedule.entity';
import { LectureStatus } from './lecture/entity/lecture.status.entity';

@Module({
  imports: [
    LectureModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'LectureReservation',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      // dropSchema: true,
      entities: [Lecture, LectureStatus, LectureSchedule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
