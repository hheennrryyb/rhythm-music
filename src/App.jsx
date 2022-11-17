import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, SideBar, MusicPlayer} from './components';
import { Discover, Playlists, SinglePlaylist, Song, Artist, Charts, Login, SharePlaylist } from './pages';

import authService from './services/auth.service';
import {useDispatch} from 'react-redux'
import {setUserData ,setIsUserLogin} from './redux/features/userSlice'
import logo from './assets/Logo2.svg'
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
    <div className="">
      
      {/* <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]"> */}
        {/* <Searchbar /> */}
        <div className='hidden sm:block'>
        <img src={logo} className='absolute z-50 w-[12rem] left-[70vw] lg:left-[80vw] mt-4 '/>
        </div>

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
