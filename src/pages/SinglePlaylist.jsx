import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlaylistSongCard } from '../components';
import { useGetPlaylistSongsDataQuery } from '../redux/services/rhythmUser'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast';

function SinglePlaylist() {
  const [shareLink, setShareLink] = useState('')
  const { userData, isUserLogin } = useSelector((state) => state.user)
  const userId = userData?._id
  const { playlistId } = useParams()

  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: playlistData, isFetching: isFetchingPlaylistData, error } = useGetPlaylistSongsDataQuery({ userId, playlistId }, { skip: !isUserLogin });
  
  const rhythmWebBaseUrl = process.env.REACT_APP_WEB_URL
  const rhythmBaseUrl = process.env.REACT_APP_BASE_URL
  const [playlistName, setPlaylistName] = useState('')
  const [description, setDescription] = useState('')
  const [editable, setEditable] = useState(true)

  useEffect(()=>{
    setPlaylistName(playlistData?.playlistName)
    setDescription(playlistData?.description)
  },[playlistData])


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
      axios.post(`${rhythmBaseUrl}/sharePlaylist/create`, sharePlaylistData)
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
  
  
  const toggleEdit = () => {
    //  passed function to setState
    setEditable(current => !current);
    if(editable === false){
    const patchBody = {
      playlistName: playlistName,
      description: description
    }
    axios.patch(`${rhythmBaseUrl}/users/${userId}/${playlistId}`,patchBody)
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
        <div className="flex flex-wrap items-end bg-gradient-to-br from-white/10 to-[#51D5FF]/10 backdrop-blur-lg rounded-b-3xl p-5">
          <div className='flex flex-col flex-1 mr-5'>
            <input className={`text-white text-5xl font-bold p-2 bg-transparent ${editable === false? "bg-gray-800/50 rounded-lg": "bg-transparent" }`} value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)} readOnly={editable}/>
            <textarea className={`text-white bg-transparent resize-none p-2 mt-3 ${editable === false? "bg-gray-800/50 rounded-lg": "bg-transparent" }`} value={description} onChange={(e)=>setDescription(e.target.value)} readOnly={editable} res />
            <button className='mt-3 btn w-[10rem]' onClick={toggleEdit}>{editable === false? "Save": "Edit" }</button>
          </div>

          <div className="flex flex-col w-[23rem]">
            <input className='mt-6 input ' onClick={() => {navigator.clipboard.writeText(`${rhythmWebBaseUrl}/share-playlist/${shareLink}`) 
            toast.success(`Share Link Copied To Your Clipboard`)}} value={'share-playlist/' + shareLink} readOnly  />
            <button className='mt-3 btn ' onClick={() => handleShareLink()}>Share Playlist</button>
          </div>
        </div>
      <div className='mt-8'>
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