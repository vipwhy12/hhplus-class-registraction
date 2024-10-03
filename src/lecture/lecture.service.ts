import { LectureMapper } from './lecture.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { LectureListDto } from './dto/lecutre.list.dto';
import { LectureRepository, LECTURE_REPOSITORY } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
    private readonly lectureMapper: LectureMapper,
  ) {}

  //날짜별로 현재 신청 가능한 특강 목록을 조회하는 API
  async findAvailableLectures(date: Date): Promise<LectureListDto[]> {
    const lectures =
      await this.lectureRepository.findAvailableLecturesByDate(date);
    return this.lectureMapper.toLectureListDto(lectures);
  }
}
