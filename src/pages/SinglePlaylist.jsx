import React from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlaylistSongCard } from '../components';
import {useGetPlaylistSongsDataQuery} from '../redux/services/rhythmUser'
import { useDispatch, useSelector } from 'react-redux'

// import { useGetSongByGenreQuery } from '../redux/services/shazamCore'

function SinglePlaylist() {
  const {userData} = useSelector((state) => state.user)
  const userId = userData?._id
    const {playlistId} = useParams()
    // const [playlistData, setPlaylistData] = useState()
    // const [getPlaylistSongsData] = useGetPlaylistSongsDataQuery()
    // console.log(playlistId.toString())
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const {data: playlistData, isFetching: isFetchingPlaylistData, error } = useGetPlaylistSongsDataQuery({userId,playlistId});
    // const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);
    console.log(playlistData)

    
    
  return (
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {playlistData?.songsData.map((song, i) => (
                        <PlaylistSongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={playlistData}
                            i={i}
                        />
                ))}
        
    </div>
  )
}

export default SinglePlaylist