import styled, { CSSObject } from 'styled-components';

export const AlbumTileRemoveButton = styled.button({
  cursor: 'pointer',
});

const layout: CSSObject = {
  display: 'block',
  width: 150,
  height: 150,
  listStyleType: 'none',
  position: 'relative',
  boxSizing: 'border-box',

  img: {
    width: '100%',
    height: '100%',
  },

  [AlbumTileRemoveButton]: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
  },

  '&:hover': {
    [AlbumTileRemoveButton]: {
      display: 'block',
    },
  },
};

export const AlbumTileLayout = styled.li(layout);
