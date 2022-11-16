import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SongCard } from '../components'
import {useNavigate} from 'react-router-dom'

function SharePlaylist() {
    let { shareId } = useParams()
    const [sharedPlaylist, setSharedPlaylist] = useState()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const navigate = useNavigate()
    const handleShareData = () => (
        shareId !== undefined ?
            axios.get(`http://localhost:8080/sharePlaylist/${shareId}`)
                .then((response) => {
                    setSharedPlaylist(response.data)
                }) : null
    )

    useEffect(() => {
        handleShareData()
    }, [shareId])

    console.log(shareId)
    return (
        <div className='w-[100vw]'>
        {shareId === undefined ?
        <div className='flex justify-center mt-[20rem]'>
            <div className=''>
            <h2>Share Playlists!</h2>
            <h3>Paste the Share Link or Playlist ID Below</h3>
            <div className="form-control">
                <div className="input-group">
                    <input type="text" placeholder="Search…" className="input input-bordered w-[30rem]"/>
                    <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
            </div>
        </div> :
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
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

        </div>}
        </div>
    )
}

export default SharePlaylist