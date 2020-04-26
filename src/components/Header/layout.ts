import styled, { CSSObject } from 'styled-components';

export const HeaderH1 = styled.h1({
  color: '#222',
  fontWeight: 'bold',
  fontSize: '5vw',
  lineHeight: '1em',
  margin: 0,
});

const layout: CSSObject = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0px -15px 20px 15px rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box',
  padding: '3vw 0 2.5vw',
};

export const HeaderLayout = styled.header(layout);
