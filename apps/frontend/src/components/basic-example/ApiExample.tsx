// Here I access the Nest.Js API that should be hosted on the 3001 port

import { useMemo, useState } from 'react';
import nestServerModule from '@/modules/nestServerModule';
import UiBox from '@/components/generic/UiBox';
import FallbackSimple from '@/components/generic/FallbackSimple';

export default function ApiExample() {
  // useMemo to make an instance and not recreate it everytime it re-renders
  const nestServer = useMemo(() => new nestServerModule(), []);

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <h3>Simple API Endpoints</h3>
        <div>
          Here&apos;s a very simple get endpoint call:
          <h6>
            It is fetching data from the API GET{' '}
            <a
              target="_blank"
              href={process.env.NEXT_PUBLIC_API_ENDPOINT + 'example'}
            >
              /example
            </a>{' '}
            endpoint
          </h6>
        </div>
        <GetExample server={nestServer}></GetExample>
        <div>
          Here&apos;s a very simple post setup
          <h6>
            It is posting data to the API POST <a>/example</a> endpoint (note
            that this function is artificially delayed by a second to simulate
            slow response)
          </h6>
        </div>
        <PostExample server={nestServer}></PostExample>
      </div>
    </UiBox>
  );
}

export function GetExample(props: { server: nestServerModule }) {
  const [exampleOutput, setExampleOutput] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function getExample() {
    setIsLoading(true);
    setExampleOutput(await props.server.getExample());
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <button
          data-testid="btn-get-example"
          className="font-bold py-2 px-4 rounded"
          onClick={getExample}
        >
          Press me!
        </button>
      </div>
      {isLoading && <FallbackSimple />}
      {!isLoading && (
        <div>Output from the get endpoint on the API: {exampleOutput}</div>
      )}
    </>
  );
}

export function PostExample(props: { server: nestServerModule }) {
  const [postExampleData, setPostExampleData] = useState<string>('');
  const [postExampleDataReturn, setPostExampleDataReturn] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function postExample() {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setPostExampleDataReturn(await props.server.postExample(postExampleData));
    setIsLoading(false);
  }
  return (
    <>
      <input
        data-testid="input-post-example"
        className="mr-2"
        name="postExampleInput"
        placeholder="Enter text here!"
        onChange={(event) => setPostExampleData(event.target.value)}
      ></input>
      <button
        data-testid="btn-post-example"
        className="font-bold py-2 px-4 rounded"
        onClick={postExample}
      >
        Press me!
      </button>
      {isLoading && <FallbackSimple />}
      {!isLoading && (
        <div>
          Output from the get endpoint on the API: {postExampleDataReturn}
        </div>
      )}
    </>
  );
}

