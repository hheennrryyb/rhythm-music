import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, SideBar, MusicPlayer} from './components';
import { Discover, Playlists, SinglePlaylist, Song, Artist, Charts, Login, SharePlaylist } from './pages';

import authService from './services/auth.service';
import {useDispatch} from 'react-redux'
import {setUserData ,setIsUserLogin} from './redux/features/userSlice'

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const { isUserLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  console.log(isUserLogin)


  useEffect(() => {
    console.log('useEffect')
    const user = authService.getCurrentUser();
    if(user._id !== null){
      dispatch(setUserData(user))
      dispatch(setIsUserLogin(true))
    console.log('useEffect dispatch user')
    }
  }, [isUserLogin]);


  return (
    <div className=" flex">
      
      {/* <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]"> */}
        {/* <Searchbar /> */}

        <div className="h-[100vh] overflow-y-scroll hide-scrollbar ">
          <div className=" pb-[12rem]">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
              <Route path="/song/:songId" element={<Song />} />
              <Route path="/artist/:artistId" element={<Artist />} />
              <Route path="/top-charts" element={<Charts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/share-playlist" element={<SharePlaylist />} />
              <Route path="/share-playlist/:shareId" element={<SharePlaylist />} />
            </Routes>
        </div>
      </div>

      {/* {activeSong?.title && ( */}
      
          <MusicPlayer />
          <SideBar />
    
      {/* )} */}
    </div>
  );
};

export default App;
