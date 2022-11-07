import React from 'react'
import {useGetSongDetailsQuery} from '../redux/services/shazamCore'
import {useParams} from 'react-router-dom'

function Song() {
    const {songId} = useParams()
    console.log(songId)
    const {data: songData, isFetching: isFetchingSongData, error } = useGetSongDetailsQuery(songId);
    console.log(songData)

  return (
    <div className='mx-auto'>
        <div className=' max-w-[40rem] '>
            {/* <div className='w-[100vw] max-h-[20rem] object-cover' style={{ backgroundImage:`url(${songData?.images.background})`}}> */}
            {/* </div> */}
            <img src={songData?.images.coverart}/>
            <h1 className='text-[5rem]'>{songData?.title}</h1>
            <h2>{songData?.subtitle}</h2>
            
            <h3>Lyrics:</h3>
            {songData?.sections[1].text.map((line)=>(
                <p>{line}</p>
            ))}
        </div>

    </div>
  )
}

export default Song