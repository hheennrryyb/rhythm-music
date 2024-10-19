import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard, GenreList } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongByGenreQuery } from "../redux/services/shazamCore";

const DiscoverGenreList = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector(
        (state) => state.player
    );
    const { data, isFetching, error } = useGetSongByGenreQuery(
        genreListId || "POP"
    );

    const handleGenreChange = (e) =>{
        dispatch(selectGenreListId(e.target.value))
    }
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    return (
        <>
            <div className='w-full mt-5 mb-5 md:px-28 px-5 flex'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
                <select
                    onChange={(e) => handleGenreChange(e)}
                    value={genreListId || "POP"}
                    className=" dropdown bg-transparent text-xl text-white ml-3 mt-2 rounded-lg outline-none"
                >
                    {genres.map((genre) => (
                        <option key={genre.value} value={genre.value} className='text-md'>
                            {genre.title}
                        </option>
                    ))}
                </select>
                
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
        <div className="flex flex-col pb-[12rem]">
            <GenreList genreListId={'POP'}/>
            <GenreList genreListId={'HIP_HOP_RAP'}/>
            <GenreList genreListId={'DANCE'}/>
            <GenreList genreListId={'SOUL_RNB'}/>
            <GenreList genreListId={'ALTERNATIVE'}/>
            <DiscoverGenreList />

        </div>
    );
};
export default Discover;
