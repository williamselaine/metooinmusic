import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { disableBodyScroll } from 'body-scroll-lock';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';

export default function NavBar() {
  const { pathname } = useLocation();
  const screenDimensions = useResizer();
  const [toHome, setToHome] = useState(false);

  const targetElement = document.querySelector('#root');
  targetElement && disableBodyScroll(targetElement);

  useEffect(() => {
    setToHome(false);
  }, [toHome]);

  const styles = {
    menu: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      zIndex: '9999',
    },
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
      display: 'flex',
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
    <Box sx={styles.menu}>
      <Box sx={styles.title} onClick={() => setToHome(true)}>Mapping #MeToo in Music</Box>
      <Box sx={styles.buttonGroup}>
        {!screenDimensions.isMobile && <Button sx={styles.button}>
          <Link to='/'>Home</Link>
        </Button>}
        <Button sx={screenDimensions.isMobile && pathname === '/about' ? { ...styles.button, ...styles.hide } : { ...styles.button, ...styles.show }}>
          <Link to='/about'>About</Link>
        </Button>
      </Box>
      {toHome && <Navigate to={'/'} />}
    </Box>
  );
}
