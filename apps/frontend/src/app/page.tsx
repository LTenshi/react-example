'use client'
import TitleBar from "@/components/TitleBar";
// import Image from "next/image";
import React from "react";



export default function Home() {
  return (
    <div className="h-screen">
      <main className="h-23/24">
        <div className="p-2">
          <TitleBar></TitleBar>
        </div>
      </main>
      <footer>
        Made by Lukasz Pawlak
      </footer>
    </div>
  );
}
