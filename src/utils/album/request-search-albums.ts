import axios from 'axios';

type APIAlbum = { id: number; title: string };
type APIResponse = { data: { results: APIAlbum[] } };

export const requestSearchAlbums = (query: string): Promise<APIResponse> => {
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
