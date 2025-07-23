import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleObjectDTO } from 'classes/ExampleObjectDTO';

export class ExampleDTO {
  example: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getDefault(): string {
    return 'You are on the API address right now! You are probably looking for one port number down (3000 hopefully)';
  }

  @Get('/example')
  getExample(): string {
    return this.appService.getExampleText();
  }

  @Post('/example')
  postExample(@Body() body: ExampleDTO): string {
    return this.appService.postExampleText(body.example);
  }

  @Get('/example/array-object')
  getExampleArray(): ExampleObjectDTO[] {
    return this.appService.getExampleArrayObject();
  }

  @Post('/example/post-movie-object')
  postMovieObject(@Body() body: ExampleObjectDTO): void {
    this.appService.postMovieExample(body);
  }
}
