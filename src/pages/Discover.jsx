import { useDispatch, useSelector } from 'react-redux'

import {Error, Loader, SongCard, GenreList} from '../components'
import {genres} from '../assets/constants'
import { selectGenreListId } from '../redux/features/playerSlice'
import {useGetSongByGenreQuery} from '../redux/services/shazamCore'
import {useGetPlaylistDataQuery} from '../redux/services/rhythmUser'

import {setPlaylistsData} from '../redux/features/playlistSlice'
import axios from 'axios';
import { userId } from '../assets/constants'
import { useState, useEffect } from 'react';

const Discover = () => {
    const dispatch = useDispatch()
    const {activeSong, isPlaying, genreListId} = useSelector((state) => state.player) 
const {data, isFetching, error } = useGetSongByGenreQuery(genreListId || "POP");
// const {playlistData, playlistIsFetching, playlistError } = useGetPlaylistDataQuery(userId);
// if(isFetching) return <Loader title='Loading Songs...' />
// if(error) return <Error/>

const genreTitle = genres.find(({value}) => value === genreListId)?.title

// const getPlaylistData = (id) =>{
//     axios.get(`http://localhost:8080/users/${id}`)
//     .then((response)=>{
//       dispatch(setPlaylistsData(response.data.savedPlaylists))
//     })
//     .catch((err) => console.log(err))
//   }
// dispatch(setPlaylistsData(playlistData?.data.savedPlaylists))
  
  useEffect(() => {
    // getPlaylistData('636037d34a75f43b75a7e4a1')
  }, []);

return (

<div className='flex flex-col'>
    
    {/* <GenreList genreListId={'ELECTRONIC'}/> */}
    {/* <GenreList genreListId={'POP'}/> */}

    <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
        <select
        onChange={(e)=> dispatch(selectGenreListId(e.target.value))}
        value={genreListId || "POP"}
        className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
        >
        {genres.map((genre)=> <option key={genre.value} value={genre.value}>{genre.title}</option> )}
        </select>
    </div>

    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map ((song, i) =>(
            <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
            />
        ))}

    </div>
</div>
)
}
export default Discover;