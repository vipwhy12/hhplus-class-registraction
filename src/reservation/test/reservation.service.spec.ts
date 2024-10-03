import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import {
  RESERVATION_REPOSITORY,
  ReservationRepository,
} from '../reservation.repository';

describe('ReservationService', () => {
  let reservationService: ReservationService;
  let reservationRepository: DeepMocked<ReservationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: RESERVATION_REPOSITORY,
          useValue: createMock<ReservationRepository>(),
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get(RESERVATION_REPOSITORY);
  });

  it('should be defined', () => {
    expect(reservationService).toBeDefined();
  });

  describe('hasUserReservedLecture', () => {
    describe('이미 수강신청한 경우', () => {
      const userId = 1;
      const lectureOptionId = 1;

      it('실패한다.', async () => {
        reservationRepository.hasUserReservedLecture.mockResolvedValue(true);

        const result = () =>
          reservationService.hasUserReservedLecture(userId, lectureOptionId);

        await expect(result).rejects.toThrow(
          new BadRequestException('이미 수강신청한 내용이 존재합니다!'),
        );
        expect(
          reservationRepository.hasUserReservedLecture,
        ).toHaveBeenCalledWith(userId, lectureOptionId);
      });
    });

    describe('수강신청하지 않은 경우', () => {
      const userId = 1;
      const lectureOptionId = 2;

      it('성공한다.', async () => {
        reservationRepository.hasUserReservedLecture.mockResolvedValue(false);

        await expect(
          reservationService.hasUserReservedLecture(userId, lectureOptionId),
        ).resolves.not.toThrow();
        expect(
          reservationRepository.hasUserReservedLecture,
        ).toHaveBeenCalledWith(userId, lectureOptionId);
      });
    });
  });

  describe('createReservation', () => {
    describe('유저가 신청을 보냈을 때', () => {
      const userId = 1;
      const lectureOptionId = 2;
      const createdReservation = { id: 1, userId, lectureOptionId };

      it('성공한다.', async () => {
        reservationRepository.createReservation.mockResolvedValue(
          createdReservation,
        );

        const result = await reservationService.createReservation(
          userId,
          lectureOptionId,
        );

        expect(result).toEqual(createdReservation);
        expect(reservationRepository.createReservation).toHaveBeenCalledWith(
          userId,
          lectureOptionId,
        );
      });
    });
  });

  describe('getReserveLectureByUserId', () => {
    describe('유저가 목록 조회를 요청하면', () => {
      const userId = 1;
      const reservations = [
        { id: 1, lectureOptionId: 1, userId: 1 },
        { id: 2, lectureOptionId: 2, userId: 1 },
      ];

      it('성공한다.', async () => {
        reservationRepository.getReserveLectureByUserId.mockResolvedValue(
          reservations,
        );

        const result =
          await reservationService.getReserveLectureByUserId(userId);

        expect(result).toEqual(reservations);
        expect(
          reservationRepository.getReserveLectureByUserId,
        ).toHaveBeenCalledWith(userId);
      });
    });
  });
});
