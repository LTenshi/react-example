'use client';
import AppWrapper from '@/components/generic/AppWrapper';
import UiBox from '@/components/generic/UiBox';
import { AdvancedVideoGameContext } from '@/contexts/AdvancedVideoGameContext';

export default function Page() {
  return (
    <AppWrapper>
      <UiBox>
        <div className="p-2 mt-2 text-xl font-medium text-black dark:text-white">
          <h6>
            A more advanced example involving ids, primary and foreign key
            setups as well as PATCH rest calls
          </h6>
        </div>
      </UiBox>
      <AdvancedVideoGameContext>
        <div></div>
      </AdvancedVideoGameContext>
    </AppWrapper>
  );
}
