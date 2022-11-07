import React from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlaylistSongCard } from '../components';
import {useGetPlaylistSongsDataQuery} from '../redux/services/rhythmUser'
import { useDispatch, useSelector } from 'react-redux'
import {userId} from '../assets/constants'
// import { useGetSongByGenreQuery } from '../redux/services/shazamCore'

function SinglePlaylist() {
    const {playlistId} = useParams()
    // const [playlistData, setPlaylistData] = useState()
    // const [getPlaylistSongsData] = useGetPlaylistSongsDataQuery()
    // console.log(playlistId.toString())
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const {data: playlistData, isFetching: isFetchingPlaylistData, error } = useGetPlaylistSongsDataQuery({userId,playlistId});
    // const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);
    console.log(playlistData)
    // const getUserData = (userId, playlistId) =>{
    // axios.get(`http://localhost:8080/users/${userId}/${playlistId}`)
    // .then((response)=>{
    //     setPlaylistData(response.data.songsData)
    // })
    // .catch((err) => console.log(err))
    // }

    // useEffect(() => {
    // getUserData('636037d34a75f43b75a7e4a1',playlistId)
    // }, []);
    
    
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