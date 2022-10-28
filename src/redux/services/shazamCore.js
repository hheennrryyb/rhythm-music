import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
      'X-RapidAPI-Key': 'c37a41b4e4mshb7fca52298c0fd1p18dab5jsn6f584d51c232'
    }
  };
  
  fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));



export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'c37a41b4e4mshb7fca52298c0fd1p18dab5jsn6f584d51c232')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/charts/world'}),
        // getSongByGenre: builder.query({query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
        getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
        getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId) => `/artists/details?artist_id=${artistId}`}),
        getSongByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
    }),
})

export const testShazamCoreApi = createApi({
    reducerPath:'testShazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://85d08bbe-a965-43e9-84bb-0aa6a138599d.mock.pstmn.io',
    }),
    endpoints: (builder) => ({
        // getTopCharts: builder.query({query: () => '/charts/world'}),
        getSongByGenre: builder.query({query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
        // getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
        // getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
        // getArtistDetails: builder.query({query: (artistId) => `/artists/details?artist_id=${artistId}`}),
        // getSongByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
        // getSongsBySearch: builder.query({query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
    }),
})

export const {
    useGetTopChartsQuery,
    // useGetSongByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;

export const {
    // useGetTopChartsQuery,
    useGetSongByGenreQuery,
    // useGetSongDetailsQuery,
    // useGetSongRelatedQuery,
    // useGetArtistDetailsQuery,
    // useGetSongByCountryQuery,
    // useGetSongsBySearchQuery,
} = testShazamCoreApi;