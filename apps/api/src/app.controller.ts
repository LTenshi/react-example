import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

export class ExampleDTO {
  example: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/example')
  getExample(): string {
    return this.appService.getExampleText();
  }

  @Post('/example')
  postExample(@Body() body: ExampleDTO): string {
    return this.appService.postExampleText(body.example);
  }
}
