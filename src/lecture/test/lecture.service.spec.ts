import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from '../lecture.service';
import { LECTURE_REPOSITORY, LectureRepository } from '../lecture.repository';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('LectureService', () => {
  let lectureService: LectureService;
  let lectureRepository: DeepMocked<LectureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LECTURE_REPOSITORY,
          useValue: createMock<LectureRepository>(),
        },
      ],
    }).compile();

    lectureService = module.get<LectureService>(LectureService);
    lectureRepository = module.get(LECTURE_REPOSITORY); // 인터페이스를 주입
  });

  it('should be defined', () => {
    expect(lectureService).toBeDefined();
  });
});
