import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userId } from '../assets/constants';
import axios from 'axios'
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {useGetPlaylistDataQuery, useAddNewSongPlaylistMutation} from '../redux/services/rhythmUser'
import {BsThreeDotsVertical} from 'react-icons/bs'

import toast, { Toaster } from 'react-hot-toast';


const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()
  const {data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery(userId);
  const [AddNewSongPlaylist] = useAddNewSongPlaylistMutation()
  console.log(playlistsData)

  // const {playlistsData, playlistIsFetching, playlistError } = useGetPlaylistDataQuery(userId);
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handleSaveEvent = (playlist) => {
    console.log("Song name " + song.title)
    console.log(playlist)
    const playlistId = playlist._id
    // axios.post(`http://localhost:8080/users/${userId}/${playlist._id}`,song)
    // .then((response)=>(console.log(response)))
    AddNewSongPlaylist({userId, playlistId, song})
    toast.success(`Successfully Added ${song.title} to ${playlist.playlistName}`);

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
      <div className='mt-4 flex flex-row justify-between'>
        <div>
        <p className='font-semibold text-lg text-white truncate w-[10rem]'>
          <Link to={`/song/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1 w-[10rem]'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
        </div>
        {/* <p onClick={() => handleSaveEvent()}>Like song</p> */}
        <div className="dropdown dropdown-top dropdown-end">
          <button tabIndex={0} className="btn"><BsThreeDotsVertical/></button>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[13.6rem]">
            {playlistsData?.savedPlaylists?.map((playlist) => (
            <li onClick={()=>handleSaveEvent(playlist)}><a>{playlist.playlistName}</a></li>
          ))}
          </ul>
        </div>
      </div>
    </div>
    // </div>
  )
};

export default SongCard;
