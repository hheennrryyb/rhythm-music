import { Link } from 'react-router-dom'
import PlayPause from './PlayPause';
import { userId } from '../assets/constants';
import axios from 'axios'
import playlistCover from '../assets/playlist_cover.png'

import { useDispatch, useSelector } from 'react-redux'
// import {setPlaylistsData} from '../redux/features/playlistSlice'
import {useDeletePlaylistMutation} from '../redux/services/rhythmUser'
import toast, { Toaster } from 'react-hot-toast';

const PlaylistCard = ({ playlistName, description, songsData, playlistId }) => {
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
      <div className='relative w-full h-56 group'>
        <img alt="song_img" src={songsData[0]?.images?.coverart || playlistCover} />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/playlist/${playlistId}`}>
            {playlistName}
          </Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          {/* <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}> */}
            {description}
          {/* </Link> */}
        </p>
        <p onClick={() => handlePlaylistDelete()}>Delete</p>
      </div>
    </div>
    // </div>
  )
};

export default PlaylistCard;
