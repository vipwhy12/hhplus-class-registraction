import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from '../lecture.service';
import { LECTURE_REPOSITORY, LectureRepository } from '../lecture.repository';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { LectureMapper } from '../lecture.mapper';
import { resolveObjectURL } from 'buffer';
import { LectureListDto } from '../dto/lecutre.list.dto';
import { LectureOption } from '../entity/lecture.option.entity';

describe('LectureService', () => {
  let lectureService: LectureService;
  let lectureRepository: DeepMocked<LectureRepository>;
  let lectureMapper: DeepMocked<LectureMapper>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: LECTURE_REPOSITORY,
          useValue: createMock<LectureRepository>(),
        },
        {
          provide: LectureMapper,
          useValue: createMock<LectureMapper>(),
        },
      ],
    }).compile();

    lectureService = module.get<LectureService>(LectureService);
    lectureRepository = module.get(LECTURE_REPOSITORY); // 인터페이스를 주입
    lectureMapper = module.get(LectureMapper);
  });

  it('should be defined', () => {
    expect(lectureService).toBeDefined();
  });

  describe('findAvailableLectures', () => {
    describe('특정 날짜에 특강 목록을 조회할 때', () => {
      const date = new Date();
      const lectureOptions: LectureOption[] = [
        {
          id: 1,
          capacity: 30,
          lectureDate: new Date(),
          lecture: {
            id: 1,
            title: 'Lecture 1',
            coach: 'Coach 1',
            lectureOption: [],
          },
          lectureStatus: {
            id: 1,
            available_seats: 10,
            lectureOption: null,
          },
          reservation: [],
        },
      ];

      const lectureListDtos: LectureListDto[] = [
        {
          id: 1,
          lectureDate: '2023-10-04',
          capacity: 30,
          availableSeats: 10,
          title: 'Lecture 1',
          coach: 'Coach 1',
        },
      ];

      it('성공한다.', async () => {
        jest
          .spyOn(lectureRepository, 'findAvailableLecturesByDate')
          .mockResolvedValue(lectureOptions);

        jest
          .spyOn(lectureMapper, 'toLectureListDto')
          .mockReturnValue(lectureListDtos);

        const result = () => lectureService.findAvailableLectures(date);

        await expect(result()).resolves.toEqual(lectureListDtos);
        expect(
          lectureRepository.findAvailableLecturesByDate,
        ).toHaveBeenCalledWith(date);
        expect(lectureMapper.toLectureListDto).toHaveBeenCalledWith(
          lectureOptions,
        );
      });
    });
  });

  describe('checkAvailableSeat', () => {
    describe('좌석이 부족할 때', () => {
      const lectureOptionId = 1;
      it('실패한다.', async () => {
        jest
          .spyOn(lectureRepository, 'checkAvailableSeat')
          .mockResolvedValue(0);

        const result = () => lectureService.checkAvailableSeat(lectureOptionId);
        await expect(result).rejects.toThrow(BadRequestException);
      });
    });

    describe('좌석이 있을 때', () => {
      const lectureOptionId = 1;
      it('성공한다.', async () => {
        jest
          .spyOn(lectureRepository, 'checkAvailableSeat')
          .mockResolvedValue(5);

        await expect(
          lectureService.checkAvailableSeat(lectureOptionId),
        ).resolves.not.toThrow();
        expect(lectureRepository.checkAvailableSeat).toHaveBeenCalledWith(
          lectureOptionId,
        );
      });
    });
  });

  describe('updateAvailableSeat', () => {
    describe('좌석 업데이트 요청이 들어오면', () => {
      const lectureOptionId = 1;
      it('성공한다.', async () => {
        jest
          .spyOn(lectureRepository, 'updateAvailableSeat')
          .mockResolvedValue(undefined);

        await lectureService.updateAvailableSeat(lectureOptionId);

        expect(lectureRepository.updateAvailableSeat).toHaveBeenCalledWith(
          lectureOptionId,
        );
      });
    });
  });
});
