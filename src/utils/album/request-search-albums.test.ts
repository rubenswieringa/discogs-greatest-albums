import nock from 'nock';

import { requestSearchAlbums } from './request-search-albums';

describe('requestSearchAlbums()', () => {
  const WAIT = 500;
  const DOMAIN = 'https://api.discogs.com';

  afterEach(nock.cleanAll);

  it(
    'sends a request to the Discogs API',
    done => {
      const query = 'slayer';

      nock(DOMAIN)
        .get(path => {
          expect(path).toBe('/database/search');
          return true;
        })
        .query(params => {
          expect(params.q).toBe(query);
          expect(params.type).toBe('master');
          expect(Object.keys(params).sort()).toEqual(['q', 'type', 'key', 'secret'].sort());
          done();
          return true;
        })
        .reply(200);

      requestSearchAlbums(query);
    },
    WAIT,
  );

  it(
    'URL-encodes queries',
    done => {
      const query = 'king gizzard & the liz=rd’s wiz@rd';

      nock(DOMAIN)
        .get(/.*/)
        .reply(uri => {
          const encoded = uri.match(/(?<=\?q=|&q=)[^&]+/)![0];
          expect(encoded).toBe('king+gizzard+%26+the+liz%3Drd%E2%80%99s+wiz%40rd');
          done();
          return 200;
        });

      requestSearchAlbums(query);
    },
    WAIT,
  );

  it('resolves for HTTP-status 200', () => {
    const data = { results: [{ id: 1, title: 'Peach' }, { id: 2, title: 'Bay Dream' }] };

    nock(DOMAIN)
      .get(/.*/)
      .reply(200, data);

    return expect(requestSearchAlbums('culture abuse')).resolves.toMatchObject({ data });
  });

  it('rejects for HTTP-errors', () => {
    nock(DOMAIN)
      .get(/.*/)
      .reply(403);

    return expect(requestSearchAlbums('slayer')).rejects.toBeDefined();
  });
});
