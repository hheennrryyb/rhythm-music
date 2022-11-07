import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, SideBar, MusicPlayer} from './components';
import { Discover, Playlists, SinglePlaylist, Song } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);



  return (
    <div className="relative flex">
      
      {/* <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]"> */}
        {/* <Searchbar /> */}

        <div className="h-[100vh] overflow-y-scroll hide-scrollbar ">
          <div className="h-fit pb-[12rem]">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
              <Route path="/song/:songId" element={<Song />} />
            </Routes>
          </div>
          {/* <div className="xl:sticky relative top-0 h-fit">
            {/* <TopPlay /> */}
          {/* </div> */}
        </div>
      {/* </div> */}

      {/* {activeSong?.title && ( */}
      
          <MusicPlayer />
          <SideBar />
    
      {/* )} */}
    </div>
  );
};

export default App;
