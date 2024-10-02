import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureModule } from './lecture/lecture.module';
import { Lecture } from './lecture/entity/lecture.entity';
import { LectureOption } from './lecture/entity/lecture.option.entity';
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
      entities: [Lecture, LectureStatus, LectureOption],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
