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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LectureModule,
    ReservationModule,
    LectureFacadeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: 'LectureReservation',
        synchronize: true,
        logging: false,
        entities: [Lecture, LectureStatus, LectureOption, Reservation],
      }),
    }),
  ],
  controllers: [AppController, LectureFacadeController],
  providers: [AppService, LectureFacadeService],
})
export class AppModule {}
