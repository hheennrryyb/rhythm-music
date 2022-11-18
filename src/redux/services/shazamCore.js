import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rhythmBaseUrl = process.env.REACT_APP_BASE_URL
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
//       'X-RapidAPI-Key': ''
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


export const rhythmCoreApi = createApi({
    reducerPath:'rhythmCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: rhythmBaseUrl,
        // prepareHeaders: (headers) => {
        //     headers.set('X-RapidAPI-Key', '')
        //     return headers
        // },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/charts/world'}),
        getSongByGenre: builder.query({query: (genre) => `/charts/${genre}`}),
    }),
})

export const {
    useGetTopChartsQuery,
    useGetSongByGenreQuery,
} = rhythmCoreApi;
