import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios'
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {useGetPlaylistDataQuery, useDeleteSongPlaylistMutation} from '../redux/services/rhythmUser'
import toast, { Toaster } from 'react-hot-toast';

const PlaylistSongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const {userData} = useSelector((state) => state.user)
  const userId = userData?._id
  const dispatch = useDispatch()
  const {playlistId} = useParams()
  const {data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery(userId);
  const [DeleteSongPlaylist] = useDeleteSongPlaylistMutation()
  console.log(playlistsData)

  // const {playlistsData, playlistIsFetching, playlistError } = useGetPlaylistDataQuery(userId);
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handleDeleteEvent = (playlist) => {
    console.log(song.title + song.key)
    // console.log(playlist._id)
    console.log(playlistId)
    const songId = song.key
    // console.log(userId + playlistId + songId)
    // axios.post(`http://localhost:8080/users/${userId}/${playlist._id}`,song)
    // .then((response)=>(console.log(response)))
    DeleteSongPlaylist({userId, playlistId, songId})
    toast.success(`Successfully Deleted ${song.title}`);
  }

  return (
    // <div className='block'>
    <div className='flex flex-col w-[250px] p-4 bg-gray-600 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black gb-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
        {/* <p onClick={() => handleSaveEvent()}>Like song</p> */}
          <div onClick={()=> handleDeleteEvent()} className="btn m-1">❌</div>
      </div>
    </div>
    // </div>
  )
};

export default PlaylistSongCard;
