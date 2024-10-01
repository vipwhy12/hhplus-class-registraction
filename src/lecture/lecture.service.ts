import { Inject, Injectable } from '@nestjs/common';
import { LectureRepository, LECTURE_REPOSITORY } from './lecture.repository';
import { plainToInstance } from 'class-transformer';
import { LectureListDto } from './dto/lecutre.list.dto';
import { LectureSchedule } from './entity/lecture.schedule.entity';

@Injectable()
export class LectureService {
  private readonly MAX_AUDIENCE_COUNT = 30;

  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
  ) {}

  //날짜별로 현재 신청 가능한 특강 목록을 조회하는 API
  async getListByDate(date: Date): Promise<LectureListDto[]> {
    const lectures = await this.getLecturesByDate(date);
    return this.convertToDto(lectures);
  }

  //날짜별로 최대 관중 수에 맞는 특강을 조회
  async getLecturesByDate(date: Date): Promise<LectureSchedule[]> {
    return await this.lectureRepository.findAvailableLecturesByDate(date);
  }

  // Lecture 엔티티 배열을 LectureListDto 배열로 변환
  convertToDto(lectures: LectureSchedule[]): LectureListDto[] {
    return lectures.map((lecture: LectureSchedule) => {
      const availableSeats = lecture.lectureStatus[0]?.available_seats ?? 0;

      return plainToInstance(LectureListDto, {
        id: lecture.id,
        lectureDate: lecture.lectureDate,
        availableSeats,
        lecture: {
          id: lecture.id,
          title: lecture.lecture.title,
          lecturer: lecture.lecture.lecturer,
        },
      });
    });
  }
}
