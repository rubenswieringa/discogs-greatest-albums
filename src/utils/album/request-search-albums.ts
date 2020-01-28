import axios from 'axios';

export type DiscogsAPIAlbum = { id: number; title: string; thumb: string };
export type DiscogsAPIResponse = { data: { results: DiscogsAPIAlbum[] } };

export const requestSearchAlbums = (query: string): Promise<DiscogsAPIResponse> => {
  const q = query
    .split(/\s+/)
    .map(encodeURIComponent)
    .join('+');

  const params = {
    q,
    type: 'master',
    key: process.env.DISCOGS_KEY && encodeURIComponent(process.env.DISCOGS_KEY),
    secret: process.env.DISCOGS_SECRET && encodeURIComponent(process.env.DISCOGS_SECRET),
  };

  const uri =
    'https://api.discogs.com/database/search?' +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  return axios.get(uri);
};
