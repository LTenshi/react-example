import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleObjectDTO } from 'classes/ExampleObjectDTO';
import {
  ApiHeader,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExampleDTO {
  @ApiProperty()
  @IsString()
  example: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description:
      'This route only displays an info string when user goes directly to the api address',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a very simple string back to the user',
  })
  @Get('/')
  getDefault(): string {
    return 'You are on the API address right now! You are probably looking for one port number down (3000 hopefully)';
  }

  @ApiOperation({
    description:
      'This route sends back a very simple string back to the Client',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a very simple string back to the client',
  })
  @Get('/example')
  getExample(): string {
    return this.appService.getExampleText();
  }

  @ApiOperation({
    description:
      'When this route receives a string, it will return it with a prefix',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a string with a new prefix',
  })
  @Post('/example')
  postExample(@Body() body: ExampleDTO): string {
    return this.appService.postExampleText(body.example);
  }

  @ApiOperation({
    description:
      'Returns an array of objects, in this case they contain movie information',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a movie object',
    example: [
      new ExampleObjectDTO(
        'The Father',
        'A very sad movie, with a profound impact',
        10,
        new Date(),
      ),
    ],
  })
  @Get('/example/array-object')
  getExampleArray(): ExampleObjectDTO[] {
    return this.appService.getExampleArrayObject();
  }

  @ApiOperation({
    description:
      'Adds a movie to the internal memory of the API, that will display when the above GET is called',
  })
  @ApiResponse({
    status: 200,
    description: 'Adds a movie to the list of movies',
  })
  @Post('/example/post-movie-object')
  postMovieObject(@Body() body: ExampleObjectDTO): void {
    this.appService.postMovieExample(body);
  }
}
