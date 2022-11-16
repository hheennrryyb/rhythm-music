import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlaylistSongCard } from '../components';
import { useGetPlaylistSongsDataQuery } from '../redux/services/rhythmUser'
import { useDispatch, useSelector } from 'react-redux'

// import { useGetSongByGenreQuery } from '../redux/services/shazamCore'

function SinglePlaylist() {
  const [shareLink, setShareLink] = useState('')
  const { userData, isUserLogin } = useSelector((state) => state.user)
  const userId = userData?._id
  const { playlistId } = useParams()
  // const [playlistData, setPlaylistData] = useState()
  // const [getPlaylistSongsData] = useGetPlaylistSongsDataQuery()
  // console.log(playlistId.toString())
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: playlistData, isFetching: isFetchingPlaylistData, error } = useGetPlaylistSongsDataQuery({ userId, playlistId }, { skip: !isUserLogin });
  // const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);
  console.log(playlistData)

  const handleShareLink = () => {
    if (isUserLogin) {
      const sharePlaylistData = {
        username: userData.username,
        playlistName: playlistData.playlistName,
        description: playlistData.description,
        songsData: playlistData.songsData,
        created: playlistData.createdAt,
      }
      // console.log(sharePlaylistData)
      axios.post(`http://localhost:8080/sharePlaylist/create`, sharePlaylistData)
        .then((response) => {
          console.log(response.data)
          const shareId = response.data._id
          setShareLink(shareId)
        })
        .catch((error) => {
          console.error(error)
        })
    } else{
       alert('Please Login To Use This Feature')
    }
  }

  return (
    <>
      <button className='btn' onClick={()=> handleShareLink()}>Share Playlist</button>
      <input className='input w-[32rem]' onClick={()=> navigator.clipboard.writeText('http://localhost:3000/share-playlist/'+shareLink)} value={'http://localhost:3000/share-playlist/'+shareLink} readOnly placeholder='Share Link Here' />
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
    </>
  )
}

export default SinglePlaylist