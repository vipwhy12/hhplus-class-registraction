import { DataSource } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LectureService } from './../lecture/lecture.service';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class LectureFacadeService {
  constructor(
    private dataSource: DataSource,
    private readonly lectureService: LectureService,
    private readonly reservationService: ReservationService,
  ) {}

  async applyForLecture(userId: number, lectureOptionId: number) {
    await this.reservationService.hasUserReservedLecture(
      userId,
      lectureOptionId,
    );

    try {
      await this.dataSource.transaction(async (manager) => {
        await this.lectureService.checkAvailableSeat(lectureOptionId, manager);
        await this.lectureService.updateAvailableSeat(lectureOptionId, manager);
        await this.reservationService.createReservation(
          userId,
          lectureOptionId,
          manager,
        );
      });
    } catch (error) {
      //TODO: 에러 처리
      console.error(error);
      throw new BadRequestException('수강신청이 불가능합니다!');
    }
  }
}
