import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rhythmBaseUrl = process.env.REACT_APP_BASE_URL


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
