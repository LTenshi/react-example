import { useEffect, useRef, useState } from 'react';
import {
  DisplayReviewDTO,
  ReviewDTO,
  VideoGameDTO,
} from '@/classes/VideoGameDTOs';
import {
  AdvancedVideoGameContext,
  useAdvancedVideoGameContext,
} from '@/contexts/AdvancedVideoGameContext';
import { getRating, PerformPatchOperation } from '@/scripts/helpers';
import { JSONPatchObject } from '@/classes/JSONPatchObject';
import { ApiContext, useApiContext } from '@/contexts/ApiProviderContext';
import nestServerModule from '@/modules/nestServerModule';
import {
  FallbackSimple,
  InputWrapper,
  SimpleModal,
  TextDivider,
  UiBox,
} from '@/components/generic';

export default function GamesDisplay() {
  const { apiModule } = useApiContext() as ApiContext;

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <GameBoxContainer server={apiModule}></GameBoxContainer>
      </div>
    </UiBox>
  );
}

export function GameBoxContainer(props: { server: nestServerModule }) {
  const {
    videoGameList,
    isVideoGameListLoading,
    setVideoGameList,
    setIsVideoGameListLoading,
  } = useAdvancedVideoGameContext() as AdvancedVideoGameContext;

  const intialised = useRef(false);

  useEffect(() => {
    async function getExampleData() {
      setIsVideoGameListLoading(true);
      setVideoGameList(await props.server.getGames());
      setIsVideoGameListLoading(false);
    }
    if (!intialised.current) {
      getExampleData();
    }
    return () => {
      intialised.current = true;
    };
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

export function GameBox(props: {
  gameObject: VideoGameDTO;
  server: nestServerModule;
}) {
  const [reviewList, setReviewList] = useState<DisplayReviewDTO[]>([]);
  const intialised = useRef(false);

  useEffect(() => {
    async function getExampleData() {
      setReviewList(await props.server.getReviews(props.gameObject.ID));
    }

    if (!intialised.current) {
      getExampleData();
    }

    return () => {
      intialised.current = true;
    };
  }, []);

  function handleReviewUpdate(review: ReviewDTO) {
    const updatedReview = reviewList.find(
      (oldReview) => oldReview.Review.ID === review.ID,
    );
    if (updatedReview) updatedReview.Review = review;
  }

  const reviewBoxArray = reviewList.map((item, index) => (
    <div key={index} data-testid={`review-${index}`}>
      <ReviewBox
        reviewObject={item}
        gameId={props.gameObject.ID}
        server={props.server}
        onSuccessfulUpdate={(updatedReview) =>
          handleReviewUpdate(updatedReview)
        }
      ></ReviewBox>
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

export function ReviewBox(props: {
  reviewObject: DisplayReviewDTO;
  gameId: number;
  server: nestServerModule;
  onSuccessfulUpdate: (updatedReview: ReviewDTO) => void;
}) {
  const [isReviewerInfoVisible, setisReviewerInfoVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <table className="m-2 table-fixed">
        <tbody>
          <tr>
            <td className="w-full pr-1">{props.reviewObject.Review.Title}</td>
            <td
              data-testid={`input-review-${props.reviewObject.Review.ID}`}
              className="material-icons text-sm! cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              edit
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-[12px] italic m-2">
        {props.reviewObject.Review.ReviewText}
      </div>
      <div className="text-end text-[12px]">
        Reviewer Rating: {getRating(props.reviewObject.Review.Rating)}
      </div>
      <SimpleModal
        title="Edit Review"
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <EditReviewModalContent
          review={props.reviewObject.Review}
          server={props.server}
          onCancel={() => setIsModalVisible(false)}
          onSuccessfulUpdate={(updatedReview) =>
            props.onSuccessfulUpdate(updatedReview)
          }
        />
      </SimpleModal>
    </>
  );
}

function EditReviewModalContent(props: {
  review: ReviewDTO;
  server: nestServerModule;
  onCancel?: () => void;
  onSuccessfulUpdate: (updatedReview: ReviewDTO) => void;
}) {
  //Cloning the object so we don't change the prop
  const [clonedReviewObject, setClonedReviewObject] = useState(props.review);
  //We'll use this object to patch the values in the API
  const [patchObject, setPatchObject] = useState<JSONPatchObject[]>([]);

  async function patchReview() {
    const updatedReview = await props.server.patchReview(
      props.review.ID,
      patchObject,
    );
    if (updatedReview) props.onSuccessfulUpdate(updatedReview);

    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }

  useEffect(() => setClonedReviewObject(props.review), []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          patchReview();
        }}
      >
        <InputWrapper inputTitle="Review Title">
          <input
            data-testid="input-review-title"
            className="w-full"
            name="Title"
            required
            value={clonedReviewObject.Title}
            onChange={(e) => {
              setClonedReviewObject({
                ...clonedReviewObject,
                Title: e.target.value,
              });
              setPatchObject(
                PerformPatchOperation(patchObject, 'Title', e.target.value),
              );
            }}
          ></input>
        </InputWrapper>
        <InputWrapper inputTitle="Rating">
          <input
            data-testid="input-review-rating"
            className="w-full"
            type="number"
            min={0}
            max={10}
            required
            value={clonedReviewObject.Rating}
            onChange={(e) => {
              setClonedReviewObject({
                ...clonedReviewObject,
                Rating: Number(e.target.value),
              });
              setPatchObject(
                PerformPatchOperation(
                  patchObject,
                  'Rating',
                  Number(e.target.value),
                ),
              );
            }}
          ></input>
        </InputWrapper>
        <InputWrapper inputTitle="Review">
          <textarea
            data-testid="textarea-review-text"
            className="w-full"
            name="ReviewText"
            required
            value={clonedReviewObject.ReviewText}
            onChange={(e) => {
              setClonedReviewObject({
                ...clonedReviewObject,
                ReviewText: e.target.value,
              });
              setPatchObject(
                PerformPatchOperation(
                  patchObject,
                  'ReviewText',
                  e.target.value,
                ),
              );
            }}
          ></textarea>
        </InputWrapper>
        <div className="justify-self-end">
          <button className="p-1 mr-2" onClick={props.onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="p-1 bg-white text-black not-dark:bg-black not-dark:text-white"
            disabled={!patchObject.length}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
