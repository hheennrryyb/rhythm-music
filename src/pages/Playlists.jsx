import React from 'react'
import {PlaylistCard} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {setPlaylistsData} from '../redux/features/playlistSlice'
import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useGetPlaylistDataQuery} from '../redux/services/rhythmUser'
import {userId} from '../assets/constants'
function Playlists() {
// const dispatch = useDispatch()
// const {playlistsData} = useSelector((state) => state.playlist)
// const [playlistsData, setPlaylistsData] = useState()
const {data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery(userId);

console.log(playlistsData)
  return (
    <div className=''>
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
  )
}

export default Playlists