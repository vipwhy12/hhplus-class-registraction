import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTP 서버에 직접 접근하여 설정을 추가
  const server: http.Server = app.getHttpServer();

  // maxConnections 설정 (동시 연결 최대 개수 설정)
  server.maxConnections = 100; // 예: 최대 100개의 동시 연결 허용

  // timeout 설정 (응답 타임아웃 설정, 30초로 설정)
  server.setTimeout(30 * 1000); // 30초 후 요청 타임아웃

  await app.listen(3000);
}
bootstrap();
