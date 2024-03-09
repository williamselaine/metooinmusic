import { Container } from '@mui/material';
import Map from '../components/Map.jsx';

const styles = {
  parent: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    flexDirection: 'column',
    alignItems: 'start',
    width: '100vw',
    height: '100vh'
  },
};

function Home() {
  return (
    <>
      <Container sx={styles.parent} maxWidth={false} disableGutters>
        <Map />
      </Container>
    </>
  );
}

export default Home;
