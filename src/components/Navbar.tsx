import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';

export default function NavBar() {
  const screenDimensions = useResizer();
  const [showMenu, setShowMenu] = useState(!screenDimensions.isMobile);

  useEffect(() => {
    setShowMenu(!screenDimensions.isMobile);
  }, [screenDimensions]);

  const styles = {
    menu: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 'calc(100% - 64px)',
      zIndex: '9999',
      padding: '0px 32px'
    },
    title: {
      fontSize: screenDimensions.isMobile ? '32px' : '46px',
      width: screenDimensions.isMobile ? '200px' : '400px',
      display: 'inline-block',
      fontStyle: 'italic',
      color: Theme.light.tertiary,
      fontWeight: '600',
      margin: '0px'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',
      position: showMenu ? 1.0 : 0.0
    },
    show: {
      position: 'absolute',
      left: '24px',
      top: '5px',
      marginLeft: '0px',
      opacity: '1.0',
      transition: '1s'
    },
    hide: {
      position: 'absolute',
      left: screenDimensions.width,
      top: '5px',
      opacity: '0.0',
      transition: '1s'
    },
    burger: {
      position: 'absolute',
      top: '42px',
      left: `calc(100% - 82px)`
    },
    showBurger: {
      opacity: '1.0',
      transition: '1s'
    },
    hideBurger: {
      opacity: '0.0',
      transition: '1s'
    },
    button: {
      width: '100px',
      fontSize: '32px',
      opacity: '0.8',
      fontStyle: 'italic',
      margin: '0px 12px',
      '& a': {
        color: Theme.light.tertiary,
        fontStyle: 'italic',
        textDecoration: 'none'
      }
    }
  };

  const getClassName = (baseStyle: object, show: boolean, isMobile: boolean) => {
    if (!isMobile) {
      return baseStyle;
    }
    return show ? { ...baseStyle, ...styles.show } : { ...baseStyle, ...styles.hide };
  };

  return (
    <Box sx={styles.menu}>
      <Box sx={getClassName(styles.title, !showMenu, screenDimensions.isMobile)}>Mapping #MeToo in Music</Box>
      <Box sx={getClassName(styles.buttonGroup, showMenu, screenDimensions.isMobile)}>
        <Button sx={styles.button}>
          <Link to='/'>Home</Link>
        </Button>
        <Button sx={styles.button}>
          <Link to='/about'>About</Link>
        </Button>
      </Box>
      <Button
        sx={screenDimensions.isMobile ? { ...styles.burger, ...styles.showBurger } : { ...styles.burger, ...styles.hideBurger }}
        onClick={() => setShowMenu(!showMenu)}
      >
        <MenuIcon style={{ color: Theme.light.tertiary }} />
      </Button>
    </Box>
  );
}
