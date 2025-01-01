import { Box, IconButton } from '@mui/material';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';
import Instagram from '../assets/Instagram_logo_2022.png';
import GoFundMe from '../assets/GoFundMe_logo.png';

export default function NavBar() {
  const screenDimensions = useResizer();

  const styles = {
    title: {
      fontSize: screenDimensions.isMobile ? '32px' : '46px',
      width: screenDimensions.isMobile ? '200px' : '400px',
      display: 'inline-block',
      fontStyle: 'italic',
      color: Theme.light.tertiary,
      fontWeight: '600',
      cursor: 'pointer',
      margin: '0px 0px 0px 32px',
    },
    buttonGroup: {
      position: 'absolute',
      bottom: '0px',
      left: '0px',
    },
    button: {
      width: '100px',
      fontSize: screenDimensions.isMobile ? '18px' : '32px',
      alignItems: screenDimensions.isMobile ? 'start' : 'center',
      opacity: '0.8',
      margin: '0px 12px',
      '& a': {
        color: Theme.light.tertiary,
        textDecoration: 'none'
      }
    },
    show: {
      opacity: '1.0',
      transition: '1s'
    },
    hide: {
      opacity: '0.0',
      transition: '1s'
    },
  };

  return (
    <Box sx={styles.buttonGroup}>
    <IconButton sx={styles.button}>
        <a href="https://www.instagram.com/mapping_metoo_in_music/">
        <img src={Instagram} width='32' height='32' />
        </a>
    </IconButton>
    </Box>
  );
}
