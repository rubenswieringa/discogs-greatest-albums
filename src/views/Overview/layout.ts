import styled, { CSSObject } from 'styled-components';

import { AlbumTile } from '@components/AlbumTile';
import { mediaQuery } from '@utils/styled-components';

import { AddAlbumButton } from './AddAlbumButton';

const layout: CSSObject = {
  boxSizing: 'border-box',

  ul: {
    display: 'block',
    margin: 0,
  },
};

const small: CSSObject = {
  ul: {
    padding: '0 4vw 4vw',
  },

  [`${AlbumTile}, ${AddAlbumButton}`]: {
    width: '92vw',
    height: '92vw',
    marginBottom: '4vw',
  },
};

const large: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  paddingBottom: '4vw', // lift vertical centering a bit

  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 0,
  },

  [`${AlbumTile}, ${AddAlbumButton}`]: {
    margin: 8,
    width: '25vw',
    height: '25vw',
    minWidth: 140,
    minHeight: 140,
    maxWidth: 200,
    maxHeight: 200,
  },
};

export const OverviewLayout = styled.section({
  ...layout,
  ...small,
  [mediaQuery({ minWidth: 320 })]: {
    ...large,
  },
});
