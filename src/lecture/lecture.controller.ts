import { ParseDatePipe } from 'src/common/pipe/parse.date.pipe';
import { LectureService } from './lecture.service';
import { Controller, Get, Param } from '@nestjs/common';
import { LectureListDto } from './dto/lecutre.list.dto';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('/:date')
  async lecture(
    @Param('date', ParseDatePipe) date: Date,
  ): Promise<LectureListDto[]> {
    return await this.lectureService.getListByDate(date);
  }
}
