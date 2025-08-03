import nestServerModule from '@/modules/nestServerModule';
import { createContext, useContext, useState } from 'react';

export type ApiContext = {
  apiModule: nestServerModule;
};

const ApiContext = createContext<ApiContext | null>(null);

export function useApiContext() {
  return useContext(ApiContext);
}

export function ApiContextProvider(props: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [apiModule] = useState<nestServerModule>(new nestServerModule());
  const value = {
    apiModule,
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
}
