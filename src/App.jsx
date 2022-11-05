import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, SideBar, MusicPlayer, TopPlay } from './components';
import { Discover, Playlists, SinglePlaylist } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);



  return (
    <div className="relative flex">
      <SideBar />
      {/* <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]"> */}
        {/* <Searchbar /> */}

        <div className="h-[100vh] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            {/* <TopPlay /> */}
          </div>
        </div>
      {/* </div> */}

      {/* {activeSong?.title && ( */}
      
        
          <MusicPlayer />
    
      {/* )} */}
    </div>
  );
};

export default App;
