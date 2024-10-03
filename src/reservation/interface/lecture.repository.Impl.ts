import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../reservation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entity/reservation.entity';
import { Repository } from 'typeorm';
import { LectureOption } from 'src/lecture/entity/lecture.option.entity';

@Injectable()
export class ReservationRepositoryImpl implements ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(userId: number, lectureOptionId: number) {
    return await this.reservationRepository.save({
      userId,
      lectureOption: { id: 1 },
    });
  }

  async getLectureReserveById(userId: number, id: number) {
    const result = await this.reservationRepository.findOne({
      where: {
        userId,
        lectureOption: { id },
      },
    });
    return result;
  }

  async addLectureReservation(userId: number, lectureOption: LectureOption) {
    return await this.reservationRepository.save({
      userId,
      lectureOption,
    });
  }
}
