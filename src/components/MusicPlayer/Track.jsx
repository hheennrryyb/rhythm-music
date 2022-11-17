import React from 'react';
import placeHolder from '../../assets/playlist_cover.png'

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex items-center justify-start w-[55%] lg:w-[20rem]">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.images?.coverart || placeHolder} alt="cover art" className="rounded-full" />
    </div>
    <div className=" sm:w-[13rem] w-[8rem] ">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title ? activeSong?.title : 'No Active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle ? activeSong?.subtitle : ''}
      </p>
    </div>
  </div>
);

export default Track;
