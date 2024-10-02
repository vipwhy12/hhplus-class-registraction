import { LectureMapper } from './lecture.mapper';
import { Inject, Injectable } from '@nestjs/common';
import { LectureListDto } from './dto/lecutre.list.dto';
import { LectureOption } from './entity/lecture.option.entity';
import { LectureRepository, LECTURE_REPOSITORY } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
    private readonly lectureMapper: LectureMapper,
  ) {}

  //날짜별로 현재 신청 가능한 특강 목록을 조회하는 API
  async getListByDate(date: Date): Promise<LectureListDto[]> {
    const lectures = await this.getLecturesByDate(date);
    return this.lectureMapper.toLectureListDto(lectures);
  }

  //날짜별로 최대 관중 수에 맞는 특강을 조회
  async getLecturesByDate(date: Date): Promise<LectureOption[]> {
    return await this.lectureRepository.findAvailableLecturesByDate(date);
  }
}
