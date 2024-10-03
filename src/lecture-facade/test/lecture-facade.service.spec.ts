import { Test, TestingModule } from '@nestjs/testing';
import { LectureFacadeService } from './lecture-facade.service';

describe('LectureFacadeService', () => {
  let service: LectureFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureFacadeService],
    }).compile();

    service = module.get<LectureFacadeService>(LectureFacadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
