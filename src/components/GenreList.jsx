import React from 'react'
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { SongCard } from '../components'
import { genres } from '../assets/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSongByGenreQuery } from '../redux/services/shazamCore'

import 'swiper/css'
import 'swiper/css/free-mode'



function GenreList({ genreListId }) {
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);

    const sortedData = data?.slice(0, 10)

    return (

        <div className="w-[100vw] flex flex-col mt-8">
            <div>
                <h2 className='text-3xl font-bold'>{genres.find(({ value }) => value === genreListId)?.title}</h2>
            </div>
            <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
                className='mt-4 w-full'
            >
                {sortedData?.map((song, i) => (
                    <SwiperSlide
                        key={song?.key}
                        style={{ width: 'auto', height: 'auto' }}
                        className="animate-slideright"
                    >
                        {/* <img src={song?.images.coverart} alt="name" className="rounded-full w-40 object-cover"/>    */}
                        <SongCard
                            key={song.key}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={sortedData}
                            i={i}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}

export default GenreList