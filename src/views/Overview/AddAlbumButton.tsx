import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AddAlbumButton = styled(Link)({
  display: 'flex',
  width: 150,
  height: 150,
  justifyContent: 'center',
  alignItems: 'flex-end',
  boxSizing: 'border-box',
  color: '#d0d0d0',
  paddingBottom: 5,
  border: '2px solid #e7e7e7',
  textDecoration: 'none',
  backgroundColor: 'white',
  position: 'relative',
  textTransform: 'lowercase',
  fontSize: 15,

  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    height: '6.5%',
    backgroundColor: '#ddd',
    marginTop: '-5%',
  },

  '&::before': {
    transform: 'translate(-50%, -50%) rotate(90deg)',
  },
});
