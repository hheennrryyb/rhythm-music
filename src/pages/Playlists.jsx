import React from 'react'
import {PlaylistCard, Loader, Error} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useGetPlaylistDataQuery} from '../redux/services/rhythmUser'
import { useAddNewPlaylistMutation } from '../redux/services/rhythmUser'
import toast, { Toaster } from 'react-hot-toast';
function Playlists() {
  const {userData, isUserLogin} = useSelector((state) => state.user)
  const userId = userData?._id
// const dispatch = useDispatch()
// const {playlistsData} = useSelector((state) => state.playlist)
// const [playlistsData, setPlaylistsData] = useState()
const {data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery(userId,{skip: !isUserLogin});

const [addPlaylist] = useAddNewPlaylistMutation()
const handleNewPlaylist = (event) => {
  event.preventDefault();

  const playlistData = {
    playlistName: event.target.playlistName.value,
    description: "New Playlist"
  }
  addPlaylist({ playlistData, userId })
  event.target.playlistName.value = ''
  toast.success(`Successfully Created Playlist ${playlistData.playlistName}`);
}

if(isFetchingPlaylistsData) return <Loader title='Loading Songs...' />
if(error) return <Error/>

  return (
    <div className='w-[100vw]  px-28'>

    {isUserLogin === true? 
    <div className='mt-4'>
      <div className='flex items-center'>
      <h1 className='text-[4rem] font-semibold '>My Playlists</h1>
      <div className='form-control ml-5'>
          <form onSubmit={handleNewPlaylist} className='input-group'>
            <input className='input input-bordered w-[10rem]' placeholder='Playlist Name' name='playlistName' />
            <button className='btn btn-square '>ADD</button>
          </form>
        </div>
      </div>

    <div className='flex flex-wrap justify-center gap-8 '>
    {playlistsData?.savedPlaylists.map((playlistCard)=>(
      <PlaylistCard
      playlistId={playlistCard._id}
      playlistName={playlistCard.playlistName}
      description={playlistCard.description}
      songsData={playlistCard.songsData}
      />
    ))}
    </div>
    </div> 

    : <div>
      <h2>Please Login Below To Use The Playlist Feature</h2>
      </div>}
    </div>
  )
}

export default Playlists