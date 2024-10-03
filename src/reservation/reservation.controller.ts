import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 3️⃣  특강 신청 완료 목록 조회 API
  @Get('/:userId')
  async getLectureListByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.reservationService.getReserveLectureByUserId(userId);
  }
}
