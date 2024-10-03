import { Test, TestingModule } from '@nestjs/testing';
import { LectureFacadeController } from './lecture-facade.controller';

describe('LectureFacadeController', () => {
  let controller: LectureFacadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureFacadeController],
    }).compile();

    controller = module.get<LectureFacadeController>(LectureFacadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
