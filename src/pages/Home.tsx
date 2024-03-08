import { Container } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import MapTheme from '../constants/MapTheme.json';

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
  header: {
    width: '100%'
  },
  card: {
    padding: '2em 0px',
    textAlign: 'center',
    width: '100%',
    boxShadow: '0px 10px 20px rgba(77, 97, 108, .24)',
    borderRadius: '4px'
  }
};

console.log(MapTheme);
console.log(MapTheme[0].elementType);

const defaultProps = {
  center: {
    lat: 50.9,
    lng: 10.4
  },
  zoom: 6,
  style: MapTheme
};

function Home() {
  return (
    <>
      <Container sx={styles.parent} maxWidth={false} disableGutters>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_APP_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{
            styles: defaultProps.style,
            minZoom: 6,
            disableDefaultUI: true,
            draggable: true
          }}
        ></GoogleMapReact>
      </Container>
    </>
  );
}

export default Home;
