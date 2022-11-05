import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userId } from '../assets/constants';
import axios from 'axios'
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {useGetPlaylistDataQuery} from '../redux/services/rhythmUser'

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()
  const {data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery();

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
    axios.post(`http://localhost:8080/users/${userId}/${playlist._id}`,song)
    .then((response)=>(console.log(response)))
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
        <p onClick={() => handleSaveEvent()}>Like song</p>
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">🔥</label>
          <ul tabIndex={0} className="bottom-[50px] dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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
