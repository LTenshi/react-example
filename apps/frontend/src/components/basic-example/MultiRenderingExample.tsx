import nestServerModule from '@/modules/nestServerModule';
import UiBox from '@/components/generic/UiBox';
import { useEffect, useMemo, useRef } from 'react';
import { ExampleObjectDTO } from '@/classes/ExampleObjectDTO';
import FallbackSimple from '@/components/generic/FallbackSimple';
//We could make a function that manually does that, but this is a widely accepted alternative to moment
//and used inside of many commercial repositories.
import { format } from 'date-fns';
import getRating from '@/scripts/helpers';
import {
  MultiRenderingContext,
  useMultiRenderingContext,
} from '@/contexts/MultiRenderingContext';

export function ExampleBox(props: { exampleObject: ExampleObjectDTO }) {
  const dateAdded = format(props.exampleObject.dateAdded, 'dd/MM/yyyy');
  const ratingFormatted = getRating(props.exampleObject.rating);

  return (
    <>
      <UiBox className="flex-1 p-2 h-full">
        <div>
          <h2>{props.exampleObject.title}</h2>
          <div className="grid grid-cols-2">
            <div>{ratingFormatted}</div>
            <div className="justify-self-end">Added on: {dateAdded}</div>
          </div>
          <h6>{props.exampleObject.description}</h6>
        </div>
      </UiBox>
    </>
  );
}

export function ExampleContainer(props: { server: nestServerModule }) {
  const {
    exampleList,
    isLoadingMultiLoading,
    setExampleList,
    setIsMultiLoading,
  } = useMultiRenderingContext() as MultiRenderingContext;
  const intialised = useRef(false);

  useEffect(() => {
    async function getExampleData() {
      setIsMultiLoading(true);
      setExampleList(await props.server.getArrayObjectExample());
      setIsMultiLoading(false);
    }

    if (!intialised.current) {
      getExampleData();
    }
    return () => {
      intialised.current = true;
    };
  }, []);

  const exampleBoxArray = exampleList.map((item, index) => (
    <div key={index} data-testid={`movie-${index}`}>
      <ExampleBox exampleObject={item}></ExampleBox>
    </div>
  ));

  return (
    <>
      <h4>A list of some submarine movies</h4>
      <h6>
        The data for these is fetched from the API GET{' '}
        <a href={process.env.NEXT_PUBLIC_API_ENDPOINT + 'example/array-object'}>
          /example/array-object
        </a>{' '}
        endpoint
      </h6>
      {isLoadingMultiLoading && <FallbackSimple />}
      {!isLoadingMultiLoading && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
          {exampleBoxArray}
        </div>
      )}
    </>
  );
}

export default function MultiRenderingExample() {
  const nestServer = useMemo(() => new nestServerModule(), []);

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <ExampleContainer server={nestServer}></ExampleContainer>
      </div>
    </UiBox>
  );
}
