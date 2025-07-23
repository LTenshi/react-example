'use client'
import ApiExample from "@/components/ApiExample";
import AppWrapper from "@/components/AppWrapper";
import FormExample from "@/components/FormExample";
import MultiRenderingExample from "@/components/MultiRenderingExample";
import UiBox from "@/components/UiBox";
import { MultiRenderingContextProvider } from "@/contexts/MultiRenderingContext";

export default function Page() {
  return (
    <AppWrapper>
      <UiBox>
        <div className="p-2 mt-2 text-xl font-medium text-black dark:text-white">
          <h6>Here are some working examples of interacting with an API, in this case a Nest.js one running on <a target="_blank" href={process.env.NEXT_PUBLIC_API_ENDPOINT}>{process.env.NEXT_PUBLIC_API_ENDPOINT}</a></h6>
        </div>
      </UiBox>
      <MultiRenderingContextProvider>
        <ApiExample />
        <MultiRenderingExample />
        <FormExample />
      </MultiRenderingContextProvider>
    </AppWrapper>
  );
}
