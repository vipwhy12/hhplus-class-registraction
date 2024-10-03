import { ParseDatePipe } from 'src/common/pipe/parse.date.pipe';
import { LectureService } from './lecture.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /**
   * 2️⃣ 특강 선택 API: 특정 일자를 기준으로 청강할 수 있는 특강 목록 조회
   */
  @Get('/:date')
  async lecture(@Param('date', ParseDatePipe) date: Date) {
    return await this.lectureService.findAvailableLectures(date);
  }
}
