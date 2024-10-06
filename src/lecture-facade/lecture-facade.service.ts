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
    try {
      //1. 트랜잭션 시작
      await this.dataSource.transaction(async (manager) => {
        //2. 사용자가 이미 수강신청한 강의인지 확인

        await this.reservationService.hasUserReservedLecture(
          userId,
          lectureOptionId,
          manager,
        );
        //3. 수강 신청이 가능한지 확인 (Lock)
        await this.lectureService.checkAvailableSeat(
          lectureOptionId,
          manager,
          userId,
        );

        //4. 수강 신청 (Lock)
        await this.lectureService.updateAvailableSeat(lectureOptionId, manager);

        //5. 수강 신청  내역 저장 _(Lock?)
        await this.reservationService.createReservation(
          userId,
          lectureOptionId,
          manager,
        );
      });
    } catch (error) {
      //TODO: 에러 처리
      console.log(`!!!!!!${userId} 수강신청에 실패했습니다. ${error.message}`);
      console.error(error);
      throw new BadRequestException(
        `${userId}의 수강신청에 실패했습니다. ${error.message}`,
      );
    }
  }
}
