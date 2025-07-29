import { VideoGameDTO } from '@/classes/VideoGameDTOs';
import { createContext, useContext, useState } from 'react';

export type AdvancedVideoGameContext = {
  videoGameList: VideoGameDTO[];
  isVideoGameListLoading: boolean;
  setVideoGameList: (val: VideoGameDTO[]) => void;
  setIsVideoGameListLoading: (val: boolean) => void;
};

const AdvancedVideoGameContext = createContext<AdvancedVideoGameContext | null>(
  null,
);

export function useAdvancedVideoGameContext() {
  return useContext(AdvancedVideoGameContext);
}

export function AdvancedVideoGameContextProvider(props: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [videoGameList, setVideoGameList] = useState<VideoGameDTO[]>([]);
  const [isVideoGameListLoading, setIsVideoGameListLoading] = useState(false);

  const value = {
    videoGameList,
    isVideoGameListLoading,
    setVideoGameList,
    setIsVideoGameListLoading,
  };

  return (
    <AdvancedVideoGameContext.Provider value={value}>
      {props.children}
    </AdvancedVideoGameContext.Provider>
  );
}
