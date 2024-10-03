import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { ReservationRepositoryImpl } from './interface/lecture.repository.Impl';
import { RESERVATION_REPOSITORY } from './reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    {
      provide: RESERVATION_REPOSITORY,
      useClass: ReservationRepositoryImpl,
    },
  ],
  exports: [ReservationService],
})
export class ReservationModule {}
