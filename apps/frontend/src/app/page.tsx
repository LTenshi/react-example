'use client'
import ApiExample from "@/components/ApiExample";
import MultiRenderingExample from "@/components/MultiRenderingExample";
import { PreambleStuff } from "@/components/PreambleStuff";
import TitleBar from "@/components/TitleBar";
// import Image from "next/image";
import React from "react";



export default function Home() {
  return (
    <div className="h-screen">
      <main className="h-23/24 overflow-auto">
        <div className="p-2">
          <TitleBar />
          <PreambleStuff />
          <ApiExample />
          <MultiRenderingExample />
        </div>
      </main>
      <footer className="text-right pr-2 h-1/24">
        Made by <a target="_blank" href="https://github.com/LTenshi/react-example">Lukasz Pawlak</a>
      </footer>
    </div>
  );
}
