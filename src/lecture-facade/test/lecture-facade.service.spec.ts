import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../../reservation/reservation.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { LectureFacadeService } from '../lecture-facade.service';
import { LectureService } from '../../lecture/lecture.service';

describe('LectureFacadeService', () => {
  let lectureFacadeService: LectureFacadeService;
  let lectureService: DeepMocked<LectureService>;
  let reservationService: DeepMocked<ReservationService>;
  let dataSource: DeepMocked<DataSource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureFacadeService,
        {
          provide: LectureService,
          useValue: createMock<LectureService>(),
        },
        {
          provide: ReservationService,
          useValue: createMock<ReservationService>(),
        },
        {
          provide: DataSource,
          useValue: createMock<DataSource>(),
        },
      ],
    }).compile();

    lectureFacadeService =
      module.get<LectureFacadeService>(LectureFacadeService);
    lectureService = module.get(LectureService);
    reservationService = module.get(ReservationService);
    dataSource = module.get(DataSource);
  });

  it('should be defined', () => {
    expect(lectureFacadeService).toBeDefined();
  });

  describe('applyForLecture', () => {
    const userId = 1;
    const lectureOptionId = 1;

    it('이미 수강신청한 경우 실패한다.', async () => {
      // 이미 수강 신청한 경우 mock 처리
      reservationService.hasUserReservedLecture.mockRejectedValue(
        new BadRequestException('이미 수강신청한 내용이 존재합니다!'),
      );

      const result = () =>
        lectureFacadeService.applyForLecture(userId, lectureOptionId);

      await expect(result).rejects.toThrow(
        new BadRequestException('이미 수강신청한 내용이 존재합니다!'),
      );

      expect(reservationService.hasUserReservedLecture).toHaveBeenCalledWith(
        userId,
        lectureOptionId,
      );
    });

    it('트랜잭션 중 에러 발생 시 실패한다.', async () => {
      // 트랜잭션에서 에러 발생하는 경우 mock 처리
      reservationService.hasUserReservedLecture.mockResolvedValue(undefined);
      lectureService.checkAvailableSeat.mockResolvedValue(undefined);
      lectureService.updateAvailableSeat.mockResolvedValue(undefined);
      reservationService.createReservation.mockResolvedValue(undefined);
      dataSource.transaction.mockRejectedValue(new Error('Transaction Error'));

      const result = () =>
        lectureFacadeService.applyForLecture(userId, lectureOptionId);

      await expect(result).rejects.toThrow(
        new BadRequestException('수강신청이 불가능합니다!'),
      );

      expect(dataSource.transaction).toHaveBeenCalled();
    });
  });
});
