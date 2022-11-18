import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const rhythmBaseUrl = process.env.REACT_APP_BASE_URL

export const rhythmUserApi = createApi({
    reducerPath:'rhythmUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${rhythmBaseUrl}/users`,
        prepareHeaders: (headers) => {
            return headers
        },
    }),
    tagTypes:['Playlist'],
    endpoints: (builder) => ({
        getPlaylistData: builder.query({
            query: (userId) => `/${userId}`,
            providesTags: ['Playlist']
        }),
        getPlaylistSongsData : builder.query({
            query:({userId, playlistId}) => `/${userId}/${playlistId}`,
            providesTags: ['Playlist']
        }),
        addNewPlaylist: builder.mutation({
            query:({playlistData, userId}) => ({
                url: `/${userId}/playlist`,
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
        }),
        addNewSongPlaylist : builder.mutation({
            query:({userId, playlistId, song}) => ({
                url: `/${userId}/${playlistId}`,
                method: 'POST',
                body: song
            }),
            invalidatesTags: ['Playlist'],
        }),
        addNewSongPlaylist : builder.mutation({
            query:({userId, playlistId, song}) => ({
                url: `/${userId}/${playlistId}`,
                method: 'POST',
                body: song
            }),
            invalidatesTags: ['Playlist'],
        }),
        deleteSongPlaylist : builder.mutation({
            query:({userId, playlistId, songId}) => ({
                url: `/${userId}/${playlistId}/${songId}`,
                method: 'DELETE',
                // body: song
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
    useAddNewSongPlaylistMutation,
    useDeleteSongPlaylistMutation,
} = rhythmUserApi;