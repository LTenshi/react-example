//I am duplicating this in the client.

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

//I should maybe create a class project?
export class ExampleObjectDTO {
  constructor(
    _title: string,
    _description: string,
    _rating: number,
    _dateAdded: Date,
  ) {
    this.title = _title;
    this.description = _description;
    this.rating = _rating;
    this.dateAdded = _dateAdded;
  }

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateAdded: Date;
}
