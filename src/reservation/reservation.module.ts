import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationRepositoryImpl } from './interface/reservation.repository.Impl';
import { RESERVATION_REPOSITORY } from './reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationController } from './reservation.controller';

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
