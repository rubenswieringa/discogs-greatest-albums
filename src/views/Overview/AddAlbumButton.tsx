import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AddAlbumButton = styled(Link)({
  display: 'flex',
  width: 150,
  height: 150,
  justifyContent: 'center',
  alignItems: 'flex-end',
  boxSizing: 'border-box',
  color: '#aaa',
  paddingBottom: 5,
  border: '2px solid #e7e7e7',
  textDecoration: 'none',
  backgroundColor: 'white',
  position: 'relative',
  textTransform: 'lowercase',
  fontSize: 15,
  transitionProperty: 'color border-color',
  transitionDuration: '200ms', // transition-out duration

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '45%',
    left: '50%',
    width: '45%',
    height: '6.5%',
    margin: '-3.25% -22.5%',
    backgroundColor: '#ddd',
    transitionProperty: 'background-color',
    transitionDuration: 'inherit',
  },

  '&::before': {
    transform: 'rotate(90deg)',
  },

  '&:hover': {
    color: '#222',
    borderColor: '#333',
    transitionDuration: '80ms', // transition-in duration

    '&::before, &::after': {
      backgroundColor: '#2d2d2d',
    },
  },
});
