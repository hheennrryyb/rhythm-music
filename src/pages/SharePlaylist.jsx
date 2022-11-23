import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { SongCard } from '../components'
import { useNavigate } from 'react-router-dom'

function SharePlaylist() {
    let { shareId } = useParams()
    const rhythmBaseUrl = process.env.REACT_APP_BASE_URL
    const [sharedPlaylist, setSharedPlaylist] = useState()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const [searchShare, setSearchShare] = useState()
    const navigate = useNavigate()
    const handleSubmit = (event) =>{
        event.preventDefault()
        const input = event.target.shareLink.value
        const link = input.replace(/\/$/, "")
        const id = link.split('/')[link.split("/").length -1]
        navigate(id)
    }

    const handleShareData = () => (
        shareId !== undefined ?
            axios.get(`${rhythmBaseUrl}/sharePlaylist/${shareId}`)
                .then((response) => {
                    setSharedPlaylist(response.data)
                }) : null
    )

    useEffect(() => {
        handleShareData()
    }, [shareId])

    return (
        <div className='w-[100vw] pb-[12rem]'>
        {shareId === undefined ?
        <div className='flex justify-center mt-[20rem]'>
            <div className=''>
            <h2>View The Shared Playlists!</h2>
            <h3>Paste the Share Link or Playlist ID Below</h3>
            <form className="form-control" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" name='shareLink' placeholder="Search…" className="input input-bordered max-w-[30rem]"/>
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </form>
            </div>
        </div> :
        <div className='flex flex-col w-[100vw] lg:px-28 sm:px-5 mt-5'>
            <h2 className='text-white text-5xl font-bold p-2'>{sharedPlaylist?.playlistName}</h2>
            <h2 className='text-white bg-transparent p-2 ' >Created By: {sharedPlaylist?.username}</h2>
            {/* <h2 className='text-white bg-transparent p-2 ' >Created On: {sharedPlaylist?.created}</h2> */}
            <h2 className='text-white bg-transparent p-2 mt-3 mb-3' >{sharedPlaylist?.description}</h2>
        <div className='flex flex-wrap justify-center gap-8'>
            {sharedPlaylist && sharedPlaylist.songsData.map((song, i) => (
                <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={sharedPlaylist}
                    i={i}
                />
            ))}
        </div>
        </div>
        }
        </div>
    )
}

export default SharePlaylist