import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvancedController } from './advanced.controller';
import { AdvancedService } from './advanced.service';

@Module({
  imports: [],
  controllers: [AppController, AdvancedController],
  providers: [AppService, AdvancedService],
})
export class AppModule {}
