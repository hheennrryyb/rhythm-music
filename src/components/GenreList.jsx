import React from 'react'

import { SongCard } from '../components'
import { genres } from '../assets/constants'
import { useSelector } from 'react-redux'
import { useGetSongByGenreQuery } from '../redux/services/shazamCore'



function GenreList({ genreListId }) {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);

    const sortedData = data?.slice(0, 10)

    return (

        <div className="w-[100vw] mt-8">
            <div className='w-full mt-5 mb-5 md:px-28 px-5 '>
                <h2 className='font-bold text-3xl text-white text-left'>{genres.find(({ value }) => value === genreListId)?.title}</h2>
            </div>
            <div className='flex flex-row scrollbar-hide overflow-y-scroll gap-x-4 scroll-smooth'>
                {sortedData?.map((song, i) => (
                    <div key={i} className='w-[250px]'>
                        <SongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={sortedData}
                            i={i}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default GenreList