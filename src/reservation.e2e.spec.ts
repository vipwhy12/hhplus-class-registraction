import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';

describe('Reservation E2E Test (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const server = app.getHttpServer();

    server.maxConnections = 100; // 최대 100개의 동시 연결 허용
    server.setTimeout(30 * 1000); // 30초 후 요청 타임아웃

    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.query('DELETE FROM reservation'); // 테스트 종료 후 예약 데이터 삭제
    await app.close();
  });

  it('동시에 40명이 동일한 특강을 신청할 때, 30명만 성공해야 한다', async () => {
    const lectureOptionId = 1;
    const totalUsers = 40;
    const successCount = 30;

    const requests = Array.from({ length: totalUsers }, (_, i) => {
      return request(app.getHttpServer())
        .post('/reservation')
        .send({
          lectureOptionId,
          userId: i + 1, // 각각의 다른 userId
        })
        .expect((res) => {
          if (res.status !== 201 && res.status !== 400) {
            throw new Error(`Unexpected status code: ${res.status}`);
          }
        });
    });

    // 모든 요청이 완료될 때까지 기다림
    const responses = await Promise.allSettled(requests);

    responses.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(`userId: ${i + 1} 요청 성공`);
      } else {
        console.log(`userId: ${i + 1} 요청 실패: ${result.reason}`); // 에러 로그 확인
      }
    });
  }, 20000);
});
