import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { JSONPatchObject } from 'classes/JSONPatchObject';
import {
  DisplayReviewDTO,
  ReviewDTO,
  ReviewedPlatformsEnum,
  ReviewerInformationDTO,
  VideoGameDTO,
} from 'classes/VideoGameDTOs';

@Injectable()
export class AdvancedService {
  videoGames: VideoGameDTO[] = [
    {
      ID: 0,
      Title: 'Command and Conquer: Red Alert 3',
      Description:
        'Real time strategy game set in alternate history earth if Einstein suddenly disappeared from history',
      ReviewIds: [0],
    },
    {
      ID: 1,
      Title: `Baldur's Gate 3`,
      Description:
        'A turn-based tactical RPG featuring a wide array of colorful characters, beautiful maps and intricate D&D 5e based combat',
      ReviewIds: [1, 2],
    },
  ];

  reviews: ReviewDTO[] = [
    {
      ID: 0,
      Title: 'A Prime Example of what an RTS should be like',
      ReviewText:
        'A classic base building RTS combined with cheesy humour and featuring cheesy quotable acting from Tim Curry',
      Rating: 9,
      ReviewerId: 0,
    },
    {
      ID: 1,
      Title: 'A new cult classic',
      ReviewText: `We're still not sure which character is our favourite, but it's a close toss up between Karlach and Withers`,
      Rating: 10,
      ReviewerId: 0,
    },
    {
      ID: 2,
      Title: 'Difficult for sure',
      ReviewText: `I found the game to be too difficult for a new player`,
      Rating: 6,
      ReviewerId: 1,
    },
  ];

  reviewers: ReviewerInformationDTO[] = [
    {
      ID: 0,
      Name: 'Imaginary Reviews INC',
      Description: 'Long standing imaginary company set up by John Imaginary',
      ReviewedPlatforms: [
        ReviewedPlatformsEnum.PC,
        ReviewedPlatformsEnum.XBOX360,
      ],
    },
    {
      ID: 1,
      Name: 'Averagium Game Journalism',
      Description: 'We hire gamers from all backgrounds',
      ReviewedPlatforms: [
        ReviewedPlatformsEnum.PS3,
        ReviewedPlatformsEnum.XBOX360,
        ReviewedPlatformsEnum.NINTENDOSWITCH,
      ],
    },
  ];

  getVideoGames() {
    return this.videoGames;
  }

  getVideoGame(gameId: string) {
    const found = this.videoGames.find((game) => game.ID === Number(gameId));

    if (!found) {
      throw new NotFoundException('A game with this ID does not exist');
    }

    return found;
  }

  getReviews(gameId: string) {
    const found = this.videoGames.find((game) => game.ID === Number(gameId));

    if (!found) {
      throw new NotFoundException('A game with this ID does not exist');
    }

    if (!found.ReviewIds.length) {
      throw new NotFoundException('No reviews exist for this title');
    }

    const foundReviews: DisplayReviewDTO[] = [];

    found.ReviewIds.forEach((reviewId) => {
      const reviewFound = this.reviews.find((review) => review.ID === reviewId);
      if (reviewFound) {
        const reviewerFound = this.reviewers.find(
          (reviewer) => reviewer.ID === reviewFound.ReviewerId,
        );
        if (reviewerFound) {
          foundReviews.push({
            Review: reviewFound,
            Reviewer: reviewerFound,
          });
        }
      }
    });

    if (!foundReviews.length) {
      throw new NotFoundException('No reviews exist for this title');
    }

    return foundReviews;
  }

  getReview(gameId: string, reviewId: string) {
    const foundGame = this.videoGames.find(
      (game) => game.ID === Number(gameId),
    );

    if (!foundGame) {
      throw new NotFoundException('A game with this ID does not exist');
    }

    if (!foundGame.ReviewIds.length) {
      throw new NotFoundException('No reviews exist for this title');
    }

    const foundReview = this.reviews.find(
      (review) => review.ID === Number(reviewId),
    );

    if (!foundReview) {
      throw new NotFoundException(
        'No review with that id exist for this title',
      );
    }

    if (
      typeof foundGame.ReviewIds.find(
        (reviewId) => reviewId === foundReview.ID,
      ) !== 'number'
    ) {
      throw new NotFoundException('No review with this ID exists on the title');
    }

    return foundReview;
  }

  getReviewer(reviewerId: string) {
    const found = this.reviewers.find(
      (reviewer) => reviewer.ID === Number(reviewerId),
    );

    if (!found) {
      throw new NotFoundException('Reviewer with this ID does not exist');
    }

    return found;
  }

  getReviewReviewer(reviewId: string) {
    const foundReview = this.reviews.find(
      (review) => review.ID === Number(reviewId),
    );

    if (!foundReview) {
      throw new NotFoundException('A review with this ID does not exist');
    }

    const foundReviewer = this.reviewers.find(
      (reviewer) => reviewer.ID === foundReview.ReviewerId,
    );

    if (!foundReviewer) {
      throw new InternalServerErrorException(
        'A reviewer listed under this review does not exist',
      );
    }

    return foundReviewer;
  }

  patchReview(reviewPatchOperation: JSONPatchObject[]) {
    throw new NotImplementedException();
  }
}
