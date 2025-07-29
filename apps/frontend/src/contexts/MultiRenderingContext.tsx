import { ExampleObjectDTO } from '@/classes/ExampleObjectDTO';
import { createContext, useContext, useState } from 'react';

export type MultiRenderingContext = {
  exampleList: ExampleObjectDTO[];
  isLoadingMultiLoading: boolean;
  setExampleList: (val: ExampleObjectDTO[]) => void;
  setIsMultiLoading: (val: boolean) => void;
};

const MultiRenderingContext = createContext<MultiRenderingContext | null>(null);

export function useMultiRenderingContext() {
  return useContext(MultiRenderingContext);
}

export function MultiRenderingContextProvider(props: {
  children: React.ReactElement[];
}) {
  const [exampleList, setExampleList] = useState<ExampleObjectDTO[]>([]);
  const [isLoadingMultiLoading, setIsMultiLoading] = useState(false);

  const value = {
    exampleList,
    isLoadingMultiLoading,
    setExampleList,
    setIsMultiLoading,
  };

  return (
    <MultiRenderingContext.Provider value={value}>
      {props.children}
    </MultiRenderingContext.Provider>
  );
}
