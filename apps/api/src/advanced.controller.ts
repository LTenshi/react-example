import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdvancedService } from './advanced.service';
import {
  DisplayReviewDTO,
  ReviewDTO,
  ReviewerInformationDTO,
  VideoGameDTO,
} from 'classes/VideoGameDTOs';
import { JSONPatchObject } from 'classes/JSONPatchObject';

@Controller()
export class AdvancedController {
  constructor(private readonly advancedService: AdvancedService) {}

  @ApiOperation({
    description:
      'Returns a list of all video games that the API currently contains',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the array of video games',
  })
  @Get('advanced/video-games')
  getVideoGames(): VideoGameDTO[] {
    return this.advancedService.getVideoGames();
  }

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiOperation({
    description:
      'Returns one of the video games that the API currently contains by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the array of video games',
  })
  @Get('advanced/video-games/:id')
  getVideoGame(@Param() params: { id: string }): VideoGameDTO {
    return this.advancedService.getVideoGame(params.id);
  }

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiOperation({
    description:
      'Returns a list of all video games that the API currently contains',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the array of video games',
  })
  @Get('advanced/video-games/:id/reviews')
  getReviews(@Param() params: { id: string }): DisplayReviewDTO[] {
    return this.advancedService.getReviews(params.id);
  }

  @ApiParam({
    name: 'gameId',
    type: Number,
  })
  @ApiParam({
    name: 'reviewId',
    type: Number,
  })
  @ApiOperation({
    description:
      'Returns a list of all video games that the API currently contains',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the array of video games',
  })
  @Get('advanced/video-games/:gameId/reviews/:reviewId')
  getReview(@Param() params: { gameId: string; reviewId: string }): ReviewDTO {
    return this.advancedService.getReview(params.gameId, params.reviewId);
  }

  @ApiParam({
    name: 'reviewerId',
    type: Number,
  })
  @ApiOperation({
    description: 'Returns a reviewer with given id',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the reviewer object',
  })
  @Get('advanced/video-games/reviewers/:reviewerId')
  getReviewer(@Param() params: { reviewerId: string }): ReviewerInformationDTO {
    return this.advancedService.getReviewer(params.reviewerId);
  }

  @ApiParam({
    name: 'reviewId',
    type: Number,
  })
  @ApiOperation({
    description: 'Returns a reviewer that is under this review',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the reviewer object',
  })
  @Get('advanced/video-games/reviews/:reviewId')
  getReviewReviewer(
    @Param() params: { reviewId: string },
  ): ReviewerInformationDTO {
    return this.advancedService.getReviewReviewer(params.reviewId);
  }

  @ApiParam({
    name: 'gameId',
    type: Number,
  })
  @ApiParam({
    name: 'reviewId',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the patched review object',
  })
  @Patch('advanced/video-games/reviews/:reviewId')
  patchReview(
    @Body() body: JSONPatchObject[],
    @Param() params: { reviewId: string },
  ): ReviewDTO {
    return this.advancedService.patchReview(body, params);
  }
}
