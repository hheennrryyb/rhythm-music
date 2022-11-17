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
  
  const [playlistName, setPlaylistName] = useState('')
  const [description, setDescription] = useState('')
  const [editable, setEditable] = useState(true)

  useEffect(()=>{
    setPlaylistName(playlistData?.playlistName)
    setDescription(playlistData?.description)
  },[playlistData])
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
          const shareId = response.data._id
          setShareLink(shareId)
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      alert('Please Login To Use This Feature')
    }
  }
  
  // const handleEditPlaylistName = (text) =>{
  //   setPlaylistName(text)
  // }
  // const handleEditDescription = (text) =>{
  //   setDescription(text)
  // }

  
  const toggleEdit = () => {
    //  passed function to setState
    setEditable(current => !current);
    if(editable === false){
    const patchBody = {
      playlistName: playlistName,
      description: description
    }
    axios.patch(`http://localhost:8080/users/${userId}/${playlistId}`,patchBody)
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })
    }
  };

  return (
    <div className='flex flex-col w-[100vw] lg:px-28 sm:px-5'>
        <input className='text-5xl font-bold p-5 bg-transparent' value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)} readOnly={editable}/>
        <textarea className='bg-transparent' value={description} onChange={(e)=>setDescription(e.target.value)} readOnly={editable} />
        <button className='btn' onClick={toggleEdit}>{editable === false? "Save": "Edit" }</button>
      <div className="">
        <button className='btn' onClick={() => handleShareLink()}>Share Playlist</button>
        <input className='input w-[32rem]' onClick={() => navigator.clipboard.writeText('http://localhost:3000/share-playlist/' + shareLink)} value={'http://localhost:3000/share-playlist/' + shareLink} readOnly placeholder='Share Link Here' />
      </div>
      <div className=''>
        <div className='flex flex-wrap gap-8 justify-center'>
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
      </div>
    </div>
  )
}

export default SinglePlaylist