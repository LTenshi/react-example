export class ReviewerInformationDTO {
  constructor(
    _id: number,
    _name: string,
    _description: string,
    _reviewedPlatforms: ReviewedPlatformsEnum[],
  ) {
    this.ID = _id;
    this.Name = _name;
    this.Description = _description;
    this.ReviewedPlatforms = _reviewedPlatforms;
  }
  ID: number;
  Name: string;
  Description: string;
  ReviewedPlatforms: ReviewedPlatformsEnum[];
}

export class ReviewDTO {
  constructor(
    _id: number,
    _title: string,
    _reviewText: string,
    _rating: number,
    _reviewerId: number,
  ) {
    this.ID = _id;
    this.Title = _title;
    this.ReviewText = _reviewText;
    this.Rating = _rating;
    this.ReviewerId = _reviewerId;
  }
  ID: number;
  Title: string;
  ReviewText: string;
  Rating: number;
  ReviewerId: number;
}

export class VideoGameDTO {
  constructor(
    _id: number,
    _title: string,
    _description: string,
    _reviewIds: number[],
  ) {
    this.ID = _id;
    this.Title = _title;
    this.Description = _title;
    this.ReviewIds = _reviewIds;
  }
  ID: number;
  Title: string;
  Description: string;
  ReviewIds: number[];
}

export enum ReviewedPlatformsEnum {
  PC,
  PS1,
  PS2,
  PS3,
  PS4,
  XBOX,
  XBOX360,
  XBOXONE,
  XBOXSERIESS,
  XBOXSERIESX,
  NINTENDOSWITCH,
  NINTENDOSWITCH2,
}
