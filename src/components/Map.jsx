import GoogleMapReact from 'google-map-react';
import MapTheme from '../constants/MapTheme.json';

const defaultProps = {
  center: {
    lat: 50.9,
    lng: 10.4
  },
  zoom: 7,
  style: MapTheme
};

function Map() {
  return (
    <>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_APP_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{
            styles: defaultProps.style,
            minZoom: 5.5,
            scaleControl: false,
            zoomControl: false,
            fullscreenControlOptions: {
              position: 9,
            },
            restriction: {
              latLngBounds: {
                west: 0,
                east: 22,
                south: 44,
                north: 56,
              }
            },
            strictBounds: true,
          }}
        ></GoogleMapReact>
    </>
  );
}

export default Map;
