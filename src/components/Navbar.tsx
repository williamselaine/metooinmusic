import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { disableBodyScroll } from 'body-scroll-lock';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';

export default function NavBar() {
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
  };

  return (
    <Box sx={styles.menu}>
      <Box sx={styles.title} onClick={() => setToHome(true)}>Mapping #MeToo in Music</Box>
      {toHome && <Navigate to={'/'} />}
    </Box>
  );
}
