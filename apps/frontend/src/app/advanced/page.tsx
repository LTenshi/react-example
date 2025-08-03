'use client';
import GamesDisplay from '@/components/advanced-example/GamesDisplay';
import AppWrapper from '@/components/generic/AppWrapper';
import UiBox from '@/components/generic/UiBox';
import { AdvancedVideoGameContextProvider } from '@/contexts/AdvancedVideoGameContext';
import { ApiContextProvider } from '@/contexts/ApiProviderContext';

export default function Page() {
  return (
    <AppWrapper>
      <UiBox>
        <div className="p-2 mt-2 text-xl font-medium text-black dark:text-white">
          <h6>
            A more advanced example. The API has ids, primary and foreign key
            setups as well as PATCH rest calls while the client offers custom
            events, modal portaling and event propagation halting (currently
            under construction)
          </h6>
        </div>
      </UiBox>
      <ApiContextProvider>
        <AdvancedVideoGameContextProvider>
          <GamesDisplay />
        </AdvancedVideoGameContextProvider>
      </ApiContextProvider>
    </AppWrapper>
  );
}
