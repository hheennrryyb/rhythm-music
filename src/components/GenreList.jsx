import React from 'react'
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { SongCard } from '../components'
import { genres } from '../assets/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSongByGenreQuery } from '../redux/services/shazamCore'



function GenreList({ genreListId }) {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);

    // const sortedData = data?.slice(0, 8)
    const sortedData = data?.slice(0, 10)

    return (

        <div className="w-[100vw] mt-8">
            <div>
                <h2 className='ml-[4rem] mb-6 text-3xl font-bold text-white'>{genres.find(({ value }) => value === genreListId)?.title}</h2>
            </div>
            <div className='flex flex-row overflow-y-scroll gap-x-4 scroll-smooth'>
                {sortedData?.map((song, i) => (
                    <div className='w-[250px]'>
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