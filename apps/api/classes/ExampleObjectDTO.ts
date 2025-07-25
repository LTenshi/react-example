//I am duplicating this in the client.

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

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsDateString()
  dateAdded: Date;
}
