import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';


import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {useDeleteSongPlaylistMutation} from '../redux/services/rhythmUser'
import toast from 'react-hot-toast';
import {AiOutlineDelete} from 'react-icons/ai'

const PlaylistSongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const {userData} = useSelector((state) => state.user)
  const userId = userData?._id
  const dispatch = useDispatch()
  const {playlistId} = useParams()

  const [DeleteSongPlaylist] = useDeleteSongPlaylistMutation()


  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handleDeleteEvent = (playlist) => {
    const songId = song.key
    DeleteSongPlaylist({userId, playlistId, songId})
    toast.success(`Successfully Deleted ${song.title}`);
  }

  return (

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
        <p className='font-semibold text-lg text-white truncate w-[11rem]'>
            {song.title}
        </p>
        <p className='text-sm truncate text-gray-300 mt-1 w-[11rem]'>
            {song.subtitle}
        </p>

        </div>
          <button onClick={()=> handleDeleteEvent()} className="bg-white/10 border-none rounded-lg p-1 btn"><AiOutlineDelete size={22}/></button>
      </div>
    </div>

  )
};

export default PlaylistSongCard;
