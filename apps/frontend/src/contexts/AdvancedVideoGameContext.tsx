// import { createContext, useContext } from "react";

// export type MultiRenderingContext = {}

// const MultiRenderingContext = createContext<MultiRenderingContext | null>(null);

// export function useMultiRenderingContext() {
//   return useContext(MultiRenderingContext)
// }

export function AdvancedVideoGameContext(props: {
  children: React.ReactElement | React.ReactElement[];
}) {
  // const value = {
  // }

  return (
    <>{props.children}</>
    // <MultiRenderingContext.Provider value={value}>{props.children}</MultiRenderingContext.Provider>
  );
}
