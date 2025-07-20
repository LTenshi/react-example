// Here I access the Nest.Js API that should be hosted on the 3001 port

import { useMemo, useState } from "react";
import nestServerModule from "@/modules/nestServerModule";
import UiBox from "./UiBox";
import FallbackSimple from "./FallbackSimple";

export function GetExample(props: {server: nestServerModule}) {
  const [exampleOutput, setExampleOutput] = useState<string>();
  const [isLoading, setIsLoading] = useState(false)

  async function getExample() {
    setIsLoading(true);
    setExampleOutput(await props.server.getExample())
    setIsLoading(false);
  }

  return (
    <>
      <div>
          <button 
            className="bg-white/10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={getExample}>
              Press me!
          </button>
        </div>
        {isLoading && <FallbackSimple />}
        {!isLoading && <div>Output from the get endpoint on the API: {exampleOutput}</div>}
    </>
  )
}

export function PostExample(props: {server: nestServerModule}) {
  const [postExampleData, setPostExampleData] = useState<string>("");
  const [postExampleDataReturn, setPostExampleDataReturn] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  async function postExample() {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setPostExampleDataReturn(await props.server.postExample(postExampleData));
    setIsLoading(false);

  }
  return (
    <>
      <input className="bg-white/10 mr-2" name="postExampleInput" placeholder="Enter text here!" onChange={event => setPostExampleData(event.target.value)}></input>
      <button
        className="bg-white/10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={postExample}>
          Press me!
      </button>
      {isLoading && <FallbackSimple />}
      {!isLoading && <div>Output from the get endpoint on the API: {postExampleDataReturn}</div>}
    </>
  )
}

export default function ApiExample() {
  // useMemo to make an instance and not recreate it everytime it re-renders
  const nestServer = useMemo(() => new nestServerModule(), [])

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <div>
          Here&apos;s a very simple get setup:
        </div>
        <GetExample server={nestServer}></GetExample>
        <div className="pt-3">
          Here&apos;s a very simple post setup (note that this function is artificially delayed by a second to simulate slow response):
        </div>
        <PostExample server={nestServer}></PostExample>
      </div>
    </UiBox>
  )
}