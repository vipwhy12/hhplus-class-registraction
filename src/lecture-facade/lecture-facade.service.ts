import { DataSource } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LectureService } from './../lecture/lecture.service';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class LectureFacadeService {
  constructor(
    private dataSource: DataSource,
    private readonly lectureService: LectureService,
    private readonly reservationService: ReservationService,
  ) {}

  async applyForLecture(userId: number, lectureOptionId: number) {
    const existingReserve = await this.reservationService.getLectureReserveById(
      userId,
      lectureOptionId,
    );

    this.reservationService.isReservation(existingReserve);

    //트랜잭션 처리
    try {
      await this.dataSource.transaction(async () => {
        await this.lectureService.checkAvailableSeat(lectureOptionId);
        await this.lectureService.updateAvailableSeat(lectureOptionId);
        await this.reservationService.createReservation(
          userId,
          lectureOptionId,
        );
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('수강신청이 불가능합니다!');
    }
  }
}
