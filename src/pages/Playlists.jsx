import React from 'react'
import {PlaylistCard} from '../components'
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

console.log('is fetching'+isFetchingPlaylistsData)
console.log('error'+error)

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

  return (
    <>
    {isUserLogin === true? <div className=''>
      <div className='form-control my-auto'>
          <form onSubmit={handleNewPlaylist} className='input-group'>
            <input className='input input-bordered w-[10rem]' placeholder='Playlist Name' name='playlistName' />
            <button className='btn btn-square '>ADD</button>
          </form>
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
    </>
  )
}

export default Playlists