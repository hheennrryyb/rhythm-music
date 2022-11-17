import { Link } from 'react-router-dom'
import PlayPause from './PlayPause';

import axios from 'axios'
import playlistCover from '../assets/playlist_cover.png'

import { useDispatch, useSelector } from 'react-redux'
// import {setPlaylistsData} from '../redux/features/playlistSlice'
import {useDeletePlaylistMutation} from '../redux/services/rhythmUser'
import toast, { Toaster } from 'react-hot-toast';
import {AiOutlineDelete} from 'react-icons/ai'

const PlaylistCard = ({ playlistName, description, songsData, playlistId }) => {
  const {userData} = useSelector((state) => state.user)
  const userId = userData?._id
  const dispatch = useDispatch()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const handlePlaylistDelete = (event) =>{
    // event.preventDefault();
    // axios.delete(`http://localhost:8080/users/${userId}/${id}`)
    // .then((response)=>dispatch(setPlaylistsData(response.data)))
    deletePlaylist({userId, playlistId})
    toast.success(`Successfully Deleted ${playlistName}`);
  } 

  return (
    // <div className='block'>
    <div className='flex flex-col w-[250px] p-4 bg-gray-600 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='w-full h-56'>
      <Link to={`/playlist/${playlistId}`}>
        {songsData.length <= 1? <img alt="song_img" src={songsData[0]?.images?.coverart || playlistCover} />:
        <div className='grid grid-cols-2'>
        <img alt="song_img" src={songsData[0]?.images?.coverart || playlistCover} />
        <img alt="song_img2" src={songsData[1]?.images?.coverart || playlistCover} />
        <img alt="song_img3" src={songsData[2]?.images?.coverart || playlistCover} />
        <img alt="song_img4" src={songsData[3]?.images?.coverart || playlistCover} />
        </div>}
        </Link>
      </div>
      <div className='mt-4 flex flex-row justify-between'>
        <div>
        <p className='font-semibold text-lg text-white truncate w-[11rem]'>
        <Link to={`/playlist/${playlistId}`}>
            {playlistName}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1 w-[11rem]'>
          {/* <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}> */}
            {description}
          {/* </Link> */}
        </p>
        </div>
        <button onClick={()=> handlePlaylistDelete()} className="bg-white/10 border-none rounded-lg p-1 btn"><AiOutlineDelete size={22}/></button>
      </div>
    </div>
    // </div>
  )
};

export default PlaylistCard;
