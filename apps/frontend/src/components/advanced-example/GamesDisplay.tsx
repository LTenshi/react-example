import nestServerModule from '@/modules/nestServerModule';
import UiBox from '@/components/generic/UiBox';
import { useEffect, useMemo, useState } from 'react';
import FallbackSimple from '@/components/generic/FallbackSimple';
import { DisplayReviewDTO, VideoGameDTO } from '@/classes/VideoGameDTOs';
import {
  AdvancedVideoGameContext,
  useAdvancedVideoGameContext,
} from '@/contexts/AdvancedVideoGameContext';
import { TextDivider } from '../generic/TextDivider';
import getRating from '@/scripts/helpers';

export function GameBox(props: {
  gameObject: VideoGameDTO;
  server: nestServerModule;
}) {
  const [reviewList, setReviewList] = useState<DisplayReviewDTO[]>([]);

  // FIXME: This is called twice, presumably because it's rendering twice
  useEffect(() => {
    async function getExampleData() {
      setReviewList(await props.server.getReviews(props.gameObject.ID));
    }
    getExampleData();
  }, []);

  const reviewBoxArray = reviewList.map((item, index) => (
    <div key={index} data-testid={`review-${index}`}>
      <ReviewBox reviewObject={item}></ReviewBox>
    </div>
  ));

  return (
    <>
      <UiBox className="flex-1 p-2 h-full">
        <div>
          <div>{props.gameObject.Title}</div>
          <h6>{props.gameObject.Description}</h6>
          <TextDivider>Reviews Below</TextDivider>
          <div className="m-2">{reviewBoxArray}</div>
        </div>
      </UiBox>
    </>
  );
}

export function ReviewBox(props: { reviewObject: DisplayReviewDTO }) {
  const [isReviewerInfoVisible, setisReviewerInfoVisible] = useState(false);

  return (
    <>
      <UiBox className="flex-1 p-2 h-full">
        <div>
          <div
            className="cursor-pointer"
            onClick={() => setisReviewerInfoVisible(!isReviewerInfoVisible)}
          >
            {props.reviewObject.Reviewer.Name}
          </div>
          {isReviewerInfoVisible && (
            <h6>{props.reviewObject.Reviewer.Description}</h6>
          )}
        </div>
      </UiBox>
      <div className="m-2">{props.reviewObject.Review.Title}</div>
      <div className="text-[12px] italic m-2">
        {props.reviewObject.Review.ReviewText}
      </div>
      <div className="text-end text-[12px]">
        Reviewer Rating: {getRating(props.reviewObject.Review.Rating)}
      </div>
    </>
  );
}

export function GameBoxContainer(props: { server: nestServerModule }) {
  const {
    videoGameList,
    isVideoGameListLoading,
    setVideoGameList,
    setIsVideoGameListLoading,
  } = useAdvancedVideoGameContext() as AdvancedVideoGameContext;

  useEffect(() => {
    async function getExampleData() {
      setIsVideoGameListLoading(true);
      setVideoGameList(await props.server.getGames());
      setIsVideoGameListLoading(false);
    }
    getExampleData();
  }, []);

  const gameBoxArray = videoGameList.map((item, index) => (
    <div key={index} data-testid={`game-${index}`}>
      <GameBox gameObject={item} server={props.server}></GameBox>
    </div>
  ));

  return (
    <>
      <h4>A list of video games</h4>
      <h6>
        The data for these is fetched from the API GET{' '}
        <a href={process.env.NEXT_PUBLIC_API_ENDPOINT + 'advanced/video-games'}>
          {process.env.NEXT_PUBLIC_API_ENDPOINT + 'advanced/video-games'}
        </a>
      </h6>
      {isVideoGameListLoading && <FallbackSimple />}
      {!isVideoGameListLoading && (
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
          {gameBoxArray}
        </div>
      )}
    </>
  );
}

export default function GamesDisplay() {
  const nestServer = useMemo(() => new nestServerModule(), []);

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <GameBoxContainer server={nestServer}></GameBoxContainer>
      </div>
    </UiBox>
  );
}
