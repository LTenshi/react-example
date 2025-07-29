export class ReviewerInformationDTO {
  ID: number;
  Name: string;
  Description: string;
  ReviewedPlatforms: ReviewedPlatformsEnum[];
}

export class ReviewDTO {
  ID: number;
  Title: string;
  ReviewText: string;
  Rating: number;
  ReviewerId: number;
}

export class VideoGameDTO {
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
