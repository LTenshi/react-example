//I am duplicating this in the server.
//I should maybe create a class project?
export class ExampleObjectDTO {
  constructor(_title: string, _description: string, _rating: number, _dateAdded: Date) {
    this.title = _title;
    this.description = _description;
    this.rating = _rating;
    this.dateAdded = _dateAdded;
  }

  title: string;
  description: string;
  rating: number;
  dateAdded: Date;
}
