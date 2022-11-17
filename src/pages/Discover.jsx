import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard, GenreList } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongByGenreQuery } from "../redux/services/shazamCore";
import { useGetPlaylistDataQuery } from "../redux/services/rhythmUser";

import axios from "axios";
import { useState, useEffect } from "react";

const DiscoverGenreList = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector(
        (state) => state.player
    );
    const { data, isFetching, error } = useGetSongByGenreQuery(
        genreListId || "POP"
    );
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    return (
        <>
            <div className="w-full  mt-5 mb-5 ">
                <h2 className="ml-[4rem] font-bold text-3xl text-white">
                    Discover
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || "POP"}
                    className=" dropdown bg-transparent text-xl text-white p-3 rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => (
                        <option key={genre.value} value={genre.value} className='text-md'>
                            {genre.title}
                        </option>
                    ))}
                </select>
                </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
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
        </>
    );
};

const Discover = () => {
    const { userData } = useSelector((state) => state.user);
    const userId = userData?._id;
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector(
        (state) => state.player
    );
    const { data, isFetching, error } = useGetSongByGenreQuery(genreListId);

    if (isFetching) return <Loader title="Loading Songs..." />;
    if (error) return <Error />;

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

    return (
        <div className="flex flex-col">
            <GenreList genreListId={'ELECTRONIC'}/>
            <GenreList genreListId={'POP'}/>
            <DiscoverGenreList />

        </div>
    );
};
export default Discover;
