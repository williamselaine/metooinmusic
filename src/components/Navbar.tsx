
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';
import Theme from '../constants/Theme';

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
      padding: '0px 32px',
    },
    title: {
      fontSize: '46px',
      display: 'inline-block',
      fontStyle: 'italic',
      color: Theme.light.tertiary,
      fontWeight: '600',
      margin: '0px',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
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
            textDecoration: 'none',
        }
    },
  }

export default function NavBar() {
  return (
        <Box sx={styles.menu}>
            <Box sx={styles.title}>Mapping #MeToo in Music</Box>
            <Box sx={styles.buttonGroup}>
                <Button sx={styles.button}>
                    <Link to="/">Home</Link>
                </Button>
                <Button sx={styles.button}>
                    <Link to="/about">About</Link>
                </Button>
            </Box>
      </Box>
  );
}
