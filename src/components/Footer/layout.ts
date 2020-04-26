import styled, { CSSObject } from 'styled-components';

export const FooterP = styled.p({
  margin: 0,
  fontSize: 14,
  lineHeight: '1em',
  textAlign: 'right',

  a: {
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    color: '#f22',

    '&:hover, &:active': {
      color: '#f00',
      textDecoration: 'underline',
    },

    '&:visited': {
      color: '#c00',
    },
  },
});

const layout: CSSObject = {
  display: 'flex',
  justifyContent: 'right',
  padding: 8,
};

export const FooterLayout = styled.footer(layout);
