import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { SideBar, MusicPlayer} from './components';
import { Discover, Playlists, SinglePlaylist, Charts, Login, SharePlaylist } from './pages';

import authService from './services/auth.service';
import {useDispatch} from 'react-redux'
import {setUserData ,setIsUserLogin} from './redux/features/userSlice'
import logo from './assets/Logo2.svg'
import logoIcon from './assets/LogoIconBg.svg'

const App = () => {
  const { isUserLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    const user = authService.getCurrentUser();
    if(user._id !== null){
      dispatch(setUserData(user))
      dispatch(setIsUserLogin(true))
    }
  }, [isUserLogin]);

  return (
    <>
        <div className='hidden sm:block'>
        <a target="_blank" href="https://github.com/hheennrryyb">
        <img src={logo} className='absolute z-50 w-[12rem] left-[70vw] lg:left-[80vw] mt-4 '/>
        </a>
        </div>
        <div className=' sm:hidden'>
        <a target="_blank" href="https://github.com/hheennrryyb">
        <img src={logoIcon} className='absolute w-[4rem] left-[80vw] z-50 mt-4 '/>
        </a>
        </div>

        <div className="viewport hide-scrollbar ">
        
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
              <Route path="/top-charts" element={<Charts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/share-playlist" element={<SharePlaylist />} />
              <Route path="/share-playlist/:shareId" element={<SharePlaylist />} />
            </Routes>
 
            <MusicPlayer />
            <SideBar />

      </div>
    </>
  );
};

export default App;
