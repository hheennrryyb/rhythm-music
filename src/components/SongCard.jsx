import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetPlaylistDataQuery, useAddNewSongPlaylistMutation } from '../redux/services/rhythmUser'
import { HiOutlinePlus } from 'react-icons/hi'

import toast, { Toaster } from 'react-hot-toast';


const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const { userData, isUserLogin } = useSelector((state) => state.user)
  const userId = userData?._id
  const dispatch = useDispatch()
  const { data: playlistsData, isFetching: isFetchingPlaylistsData, error } = useGetPlaylistDataQuery(userId, { skip: !isUserLogin });
  const [AddNewSongPlaylist] = useAddNewSongPlaylistMutation()
  // console.log(playlistsData)

  // const {playlistsData, playlistIsFetching, playlistError } = useGetPlaylistDataQuery(userId);
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handleSaveEvent = (playlist) => {
    const playlistId = playlist?._id
    AddNewSongPlaylist({ userId, playlistId, song })
    toast.success(`Successfully Added ${song.title} to ${playlist.playlistName}`);

  }

  return (
    // <div className='block'>
    // <div style={{ backgroundImage:`url(${song?.images.coverart})`}} className="object-contain rounded-lg" >
    <div className='flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
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
            {/* <Link to={`/song/${song?.key}`}> */}
              {song.title}
            {/* </Link> */}
          </p>
          <p className='text-sm truncate text-gray-300 mt-1 w-[10rem]'>
            {/* <Link to={song.artists ? `/artist/${song?.artists[0]?.adamid}` : '/top-artists'}> */}
              {song.subtitle}
            {/* </Link> */}
          </p>
        </div>
        {/* <p onClick={() => handleSaveEvent()}>Like song</p> */}
        {isUserLogin === true ?
          <div className="dropdown dropdown-top dropdown-end">
            <button tabIndex={0} className="bg-white/10 rounded-lg p-1"><HiOutlinePlus size={25} /></button>
            <ul tabIndex={0} className="overflow-y-scroll dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[13.6rem] h-[15rem] flex flex-row">
              {playlistsData?.savedPlaylists.length !== 0?playlistsData?.savedPlaylists?.map((playlist, i) => (
                <li key={i} className='w-full h-fit bg-white/5 rounded-md mb-2' onClick={() => handleSaveEvent(playlist)}><a>{playlist.playlistName}</a></li>
              )): <p className='text-md p-3'>Make A New Playlist To Start Adding Songs 🎶</p>}
            </ul>
          </div>
          : null}
      </div>
    </div>
    // </div>
  )
};

export default SongCard;
