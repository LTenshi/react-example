'use client'
import ApiExample from "@/components/ApiExample";
import FormExample from "@/components/FormExample";
import MultiRenderingExample from "@/components/MultiRenderingExample";
import { PreambleStuff } from "@/components/PreambleStuff";
import TitleBar from "@/components/TitleBar";
import { MultiRenderingContextProvider } from "@/contexts/MultiRenderingContext";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="h-23/24 overflow-auto">
        <div className="p-2">
          <MultiRenderingContextProvider>
            <TitleBar />
            <PreambleStuff />
            <ApiExample />
            <MultiRenderingExample />
            <FormExample />
          </MultiRenderingContextProvider>
        </div>
      </main>
      <footer className="text-right pr-2 h-1/24">
        Made by <a target="_blank" href="https://github.com/LTenshi/react-example">Lukasz Pawlak</a>
      </footer>
    </div>
  );
}
