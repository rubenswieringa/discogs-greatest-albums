import styled, { CSSObject } from 'styled-components';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Overview } from '@views/Overview';

const MIN_HEADER_HEIGHT = 60;

const layout: CSSObject = {
  boxSizing: 'border-box',
  paddingTop: MIN_HEADER_HEIGHT, // fallback padding

  '&': {
    // trick to define same property twice
    paddingTop: `max(${MIN_HEADER_HEIGHT + 20}px, 10.5vw)`, // fancy modern padding
  },

  [Header]: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    minHeight: MIN_HEADER_HEIGHT,
    zIndex: 1, // on top of content
  },

  [Overview]: {
    minHeight: 'calc(100vh - 10.5vw)',
  },

  [Footer]: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export const AppLayout = styled.main(layout);
