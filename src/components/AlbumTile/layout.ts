import styled, { CSSObject } from 'styled-components';

export const AlbumTileRemoveButton = styled.button({
  cursor: 'pointer',
  appearance: 'none',
  width: 25,
  height: 25,
  backgroundColor: 'black',
  opacity: 0.8,
  border: 'none',
  padding: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textIndent: '100%',
  borderRadius: '50%',
  color: 'white',
  position: 'relative',

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 16,
    height: 2,
    margin: '-1px -8px',
    backgroundColor: 'currentColor',
  },

  '&::before': {
    transform: 'rotate(45deg)',
  },

  '&::after': {
    transform: 'rotate(-45deg)',
  },

  '&:hover': {
    opacity: 0.9,
  },
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
    top: 6,
    right: 6,
  },

  '&:hover': {
    [AlbumTileRemoveButton]: {
      display: 'block',
    },
  },
};

export const AlbumTileLayout = styled.li(layout);
