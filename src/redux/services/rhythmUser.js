import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com',
//       'X-RapidAPI-Key': 'c37a41b4e4mshb7fca52298c0fd1p18dab5jsn6f584d51c232'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const rhythmUserApi = createApi({
    reducerPath:'rhythmUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/users',
        prepareHeaders: (headers) => {
            // headers.set('X-RapidAPI-Key', 'c37a41b4e4mshb7fca52298c0fd1p18dab5jsn6f584d51c232')
            return headers
        },
    }),
    tagTypes:['Playlist'],
    endpoints: (builder) => ({
        // getTopCharts: builder.query({query: () => '/charts/world'}),
        // getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
        getPlaylistData: builder.query({
            query: (userId) => `/${userId}`,
            providesTags: ['Playlist']
        }),
        getPlaylistSongsData : builder.query({
            query:({userId, playlistId}) => `/${userId}/${playlistId}`,
            providesTags: ['Playlist']
        }),
        addNewPlaylist: builder.mutation({
            query:(playlistData) => ({
                url: `/636037d34a75f43b75a7e4a1/playlist`,
                method: 'POST',
                body: playlistData
            }),
            invalidatesTags: ['Playlist']
        }),
        deletePlaylist : builder.mutation({
            query:({userId, playlistId}) => ({
                url: `/${userId}/${playlistId}`,
                method: 'DELETE',
                // body: playlistData
            }),
            invalidatesTags: ['Playlist'],
        })
    }),
})

export const {
    useGetPlaylistDataQuery,
    useGetPlaylistSongsDataQuery,
    useAddNewPlaylistMutation,
    useDeletePlaylistMutation,
} = rhythmUserApi;