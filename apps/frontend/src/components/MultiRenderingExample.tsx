import nestServerModule from "@/modules/nestServerModule";
import UiBox from "./UiBox";
import { useEffect, useMemo, useState } from "react";
import { ExampleObjectDTO } from "@/classes/ExampleObjectArrayDTO";
import FallbackSimple from "./FallbackSimple";

export function ExampleBox(props: {exampleObject: ExampleObjectDTO}) {
  return (
    <>
      <UiBox className="flex-1 p-2 h-full">
        <div>
          <h2>{props.exampleObject.title}</h2>
          <h6>{props.exampleObject.description}</h6>
        </div>
      </UiBox>
    </>
  )
}

export function ExampleContainer(props: {server: nestServerModule}) {
  const [exampleList, setExampleList] = useState<ExampleObjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect( () => { 
    //AbortController pattern to avoid abort race conditions
    const controller = new AbortController(); 
    const signal = controller.signal;
    
    async function getExampleData() {
      setIsLoading(true)
      setExampleList(await props.server.getArrayObjectExample(signal))
      setIsLoading(false)
    }
    getExampleData();

    return () => controller.abort();
  }, [])
  
  const exampleBoxArray = exampleList.map((item, index) => 
    <div key={index} className="m-2">
      <ExampleBox exampleObject={item} ></ExampleBox>
    </div>
  )

  return (
    <>
      <h4>A list of some submarine movies</h4>
      {isLoading  && <FallbackSimple />}
      {!isLoading && 
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
          { exampleBoxArray }
      </div>
      }
    </>
  )
}

export default function MultiRenderingExample() {
  const nestServer = useMemo(() => new nestServerModule(), [])
  
  return (
    <UiBox className="mt-2">
      <div className="p-2">
        <ExampleContainer server={nestServer}></ExampleContainer>
      </div>
    </UiBox>
  )
}