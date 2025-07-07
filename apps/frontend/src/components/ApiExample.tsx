// Here I access the Nest.Js API that should be hosted on the 3001 port

import UiBox from "./UiBox";
import { useState } from "react";

export default function ApiExample() {
  const [exampleOutput, setExampleOutput] = useState("");
  const [postExampleData, setPostExampleData] = useState("");
  const [postExampleDataReturn, setPostExampleDataReturn] = useState("")
  
  async function getExample() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example");
      if (!response.ok) {
        throw new Error(`Request failed with: ${response.status}`);
      }

      const output = await response.text();
      setExampleOutput(output);
    } catch (e) {
      console.error("Request failed", e);
    }
  }

  async function postExample() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "example", {
        method: "POST",
        body: JSON.stringify({ example: postExampleData }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`Request failed with: ${response.status}`);
      }
      const output = await response.text();
      setPostExampleDataReturn(output);
    } catch (e) {
      console.error("Request failed", e)
    }
  }

  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <div>
          Here&apos;s a very simple get setup:
        </div>
        <div>
          <button 
            className="bg-white/10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={getExample}>
              Press me!
          </button>
        </div>
        <div>Output from the get endpoint on the API: {exampleOutput}</div>
        <div className="pt-3">
          Here&apos;s a very simple post setup:
        </div>
        <input className="bg-white/10 mr-2" name="postExampleInput" placeholder="Enter text here!" onChange={event => setPostExampleData(event.target.value)}></input>
        <button
          className="bg-white/10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={postExample}>
            Press me!
        </button>
        <div>Output from the get endpoint on the API: {postExampleDataReturn}</div>
      </div>
    </UiBox>
  )
}