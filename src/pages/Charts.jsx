import React from 'react'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'
import { SongCard } from '../components'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import 'swiper/css'
import 'swiper/css/free-mode'

const ArtistCard = ({ data, i }) => {

    return (

        <div className='flex flex-col w-[250px] p-4 bg-gray-600 bg-opacity-70 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
            <div className='w-full h-56'>
                <img className='rounded-full' alt="song_img" src={data.share?.avatar || data.images?.coverart } />
            </div>
            <p className='font-semibold text-lg text-white truncate w-[10rem]'>
                {data.subtitle}
            </p>
        </div>


    )
}


function Charts() {

    const { data, isFetching, error } = useGetTopChartsQuery()
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player)
    // console.log(data[0])
    console.log(isFetching)
    const artistData = isFetching === !true?([...data].sort(() => 0.5 - Math.random())).slice(0, 20): null
    // isFetching? ([...data]?.sort(() => 0.5 - Math.random())).slice(0, 20): ''

    return (
        <div className='flex flex-col'>

            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-5 mb-5 px-28'>
                <h2 className='font-bold text-3xl text-white text-left'>Trending Artists</h2>
            </div>

            <div className='flex flex-wrap justify-center gap-8'>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={15}
                    freeMode
                    centeredSlides
                    centeredSlidesBounds
                    modules={[FreeMode]}
                    className='mt-4 w-full'
                >
                    {artistData?.map((artist, i) => (
                        <SwiperSlide
                            key={artist?.key}
                            style={{ width: 'auto', height: 'auto' }}
                            className="animate-slideright"
                        >
                                <ArtistCard
                                    data={artist}
                                    i={i}
                                />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-5 mb-5 px-28'>
                <h2 className='font-bold text-3xl text-white text-left'>Top Charts</h2>
            </div>

            <div className='flex flex-wrap justify-center gap-8'>
                {data?.map((song, i) => (
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

export default Charts