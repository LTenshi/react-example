import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
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

    const foundReviews: ReviewDTO[] = [];
    found.ReviewIds.forEach((reviewId) => {
      const reviewFound = this.reviews.find((review) => review.ID === reviewId);
      if (reviewFound) {
        foundReviews.push(reviewFound);
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
}
