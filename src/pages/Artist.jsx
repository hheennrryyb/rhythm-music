import React from 'react'
import {useGetArtistDetailsQuery} from '../redux/services/shazamCore'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';

function Artist() {
    const {artistId} = useParams()
    // console.log(songId)
    const {data: artistData, isFetching: isFetchingArtistData, error } = useGetArtistDetailsQuery(artistId);
    // console.log(artistData)
    console.log(artistData?.artists[artistId])
    const backgroundColor = artistData?.artists[artistId].attributes.artwork.bgColor
  return (
    <div className='mx-auto'>
        <div className=' '>
            {/* <div className='w-[100vw] max-h-[20rem] object-cover' style={{ backgroundImage:`url(${artistData?.images.background})`}}> */}
            {/* </div> */}
            <div className='w-[100vw]' style={{backgroundColor: "#"+backgroundColor}}>

            <img className='rounded-full w-[20rem]' src={artistData?.artists[artistId].attributes.artwork.url}/>
            <h1>{artistData?.artists[artistId].attributes.name}</h1>
            </div>
            
            {/* <h1 className='text-[5rem]'>{artistData?.title}</h1> */}
            {/* <h2>{artistData?.subtitle}</h2> */}

            <div className='flex flex-wrap justify-center gap-8'>
        
            </div> 
            
        </div>

    </div>
  )
}

export default Artist