import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "This is an example get request output!"', () => {
      expect(appController.getExample()).toBe('This is an example get request output!');
    });

    it('should return "[ADJECTIVE]-Test', () => {
      expect(appController.postExample({example: "Test"})).toContain("-Test");
    })
  });
});
