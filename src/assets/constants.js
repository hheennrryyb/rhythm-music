import { HiOutlineHashtag, HiOutlineHome, HiTrendingUp, HiOutlineCollection } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Afro Beats', value: 'AFRO_BEATS' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
  { title: 'French Pop', value: 'FRENCH_POP' },
  { title: 'Songwriter', value: 'SINGER_SONGWRITER' },
  { title: 'Mexico', value: 'REG_MEXICO' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  // { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiTrendingUp },
  // { name: 'Share Music', to: '/share-playlist', icon: HiOutlinePhotograph },
  { name: 'My Playlists', to: '/playlists', icon: HiOutlineCollection },

];

