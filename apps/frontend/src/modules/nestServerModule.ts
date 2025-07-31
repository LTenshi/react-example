import { ExampleObjectDTO } from '@/classes/ExampleObjectDTO';
import { JSONPatchObject } from '@/classes/JSONPatchObject';
import {
  DisplayReviewDTO,
  ReviewDTO,
  VideoGameDTO,
} from '@/classes/VideoGameDTOs';

export default class nestServerModule {
  public async getExample(): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'example', {
      method: 'GET',
      signal: signal,
    })
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.text();
      });
  }

  public async getArrayObjectExample(): Promise<ExampleObjectDTO[]> {
    const controller = new AbortController();
    const { signal } = controller;
    return await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + 'example/array-object',
      {
        method: 'GET',
        signal: signal,
      },
    )
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.json() as unknown as ExampleObjectDTO[];
      });
  }

  public async postExample(dataIn: string): Promise<string> {
    const controller = new AbortController();
    const { signal } = controller;
    return await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'example', {
      method: 'POST',
      body: JSON.stringify({ example: dataIn }),
      headers: {
        'Content-Type': 'application/json',
      },
      signal: signal,
    })
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.text();
      });
  }

  public async postMovie(dataIn: ExampleObjectDTO): Promise<boolean> {
    const controller = new AbortController();
    const { signal } = controller;
    return await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + 'example/post-movie-object',
      {
        method: 'POST',
        body: JSON.stringify(dataIn),
        headers: {
          'Content-Type': 'application/json',
        },
        signal: signal,
      },
    )
      .catch((err) => {
        throw new Error(err);
      })
      .then(() => {
        return true;
      });
  }

  public async getGames(): Promise<VideoGameDTO[]> {
    const controller = new AbortController();
    const { signal } = controller;

    return await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + 'advanced/video-games',
      {
        method: 'GET',
        signal: signal,
      },
    )
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.json() as unknown as VideoGameDTO[];
      });
  }

  public async getReviews(gameId: number): Promise<DisplayReviewDTO[]> {
    const controller = new AbortController();
    const { signal } = controller;

    return await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `advanced/video-games/${gameId}/reviews`,
      {
        method: 'GET',
        signal: signal,
      },
    )
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.json() as unknown as DisplayReviewDTO[];
      });
  }

  public async patchReview(
    reviewId: number,
    gameId: number,
    patchData: JSONPatchObject[],
  ): Promise<ReviewDTO> {
    const controller = new AbortController();
    const { signal } = controller;

    return await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT +
        `advanced/video-games/${gameId}/reviews/${reviewId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(patchData),
        signal: signal,
      },
    )
      .catch((err) => {
        throw new Error(err);
      })
      .then((res) => {
        return res.json() as unknown as ReviewDTO;
      });
  }
}
