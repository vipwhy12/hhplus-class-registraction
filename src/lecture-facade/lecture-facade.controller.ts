import { Body, Controller, Post } from '@nestjs/common';
import { LectureFacadeService } from './lecture-facade.service';
import { ApplyForLectureDto } from './dto/apply.for.lecture.dto';

@Controller('lecture')
export class LectureFacadeController {
  constructor(private readonly lectureFacadeService: LectureFacadeService) {}

  // 1️⃣ 특강 신청 API: 특정 일자를 기준으로 청강할 수 있는 특강 목록 조회
  @Post('apply')
  async applyForLecture(@Body() applyForLectureDto: ApplyForLectureDto) {
    const { lectureOptionId, userId } = applyForLectureDto;
    return await this.lectureFacadeService.applyForLecture(
      userId,
      lectureOptionId,
    );
  }
}
