import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
        <div className="absolute h-28 bottom-[3.5rem] left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <div className="relative px-[5rem] w-full flex items-center justify-center ">
            <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
            
            <div className="flex flex-col mx-[5rem]">
              <Controls
                isPlaying={isPlaying}
                isActive={isActive}
                repeat={repeat}
                setRepeat={setRepeat}
                shuffle={shuffle}
                setShuffle={setShuffle}
                currentSongs={currentSongs}
                handlePlayPause={handlePlayPause}
                handlePrevSong={handlePrevSong}
                handleNextSong={handleNextSong}
              />
             </div>
            <div className="flex flex-col">
              <Player
                activeSong={activeSong}
                isPlaying={isPlaying}
                seekTime={seekTime}
                repeat={repeat}
                currentIndex={currentIndex}
                onEnded={handleNextSong}
                onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                onLoadedData={(event) => setDuration(event.target.duration)}
              />
            </div>
            <div>
            <Seekbar
                value={appTime}
                min="0"
                max={duration}
                onInput={(event) => setSeekTime(event.target.value)}
                setSeekTime={setSeekTime}
                appTime={appTime}
              />
            </div>
          </div>
        </div>
  );
};

export default MusicPlayer;
