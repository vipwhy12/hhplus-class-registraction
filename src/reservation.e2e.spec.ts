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
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    // await dataSource.query('DELETE FROM reservation'); // 테스트 종료 후 예약 데이터 삭제
    await app.close();
  });

  it('동시에 40명이 동일한 특강을 신청할 때, 30명만 성공해야 한다', async () => {
    const lectureOptionId = 1;
    const totalUsers = 40;
    const successCount = 30;

    // Promise를 사용해 동시에 40명의 요청을 보냄
    const requests = Array.from({ length: totalUsers }, (_, i) =>
      request(app.getHttpServer())
        .post('/reservation')
        .send({
          lectureOptionId,
          userId: i + 1, // 각각의 다른 userId
        })
        .expect((res) => {
          if (res.status !== 201 && res.status !== 400) {
            throw new Error(`Unexpected status code: ${res.status}`);
          }
        }),
    );

    // 모든 요청이 완료될 때까지 기다림
    const responses = await Promise.allSettled(requests);

    console.log('테스트 끝');
    // 성공한 요청과 실패한 요청을 카운트
    const successResponses = responses.filter(
      (res) => res.status === 'fulfilled' && res.value.status === 201,
    );
    const failResponses = responses.filter(
      (res) => res.status === 'fulfilled' && res.value.status === 400,
    );

    // 성공한 요청이 30건인지 확인
    expect(successResponses.length).toBe(successCount);
    // 실패한 요청이 10건인지 확인
    expect(failResponses.length).toBe(totalUsers - successCount);
  }, 20000);
});
