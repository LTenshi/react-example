//I am duplicating this in the client.
//I should maybe create a class project?
export class ExampleObjectDTO {
  constructor(_title: string, _description: string) {
    this.title = _title;
    this.description = _description;
  }

  title: string;
  description: string;
}
