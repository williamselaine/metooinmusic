
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Container } from '@mui/material';
import Theme from '../constants/Theme';
import Pins from './Pins';
import Flags from './Flags';
import Deutschland from '../assets/deutschland';
import { usePins, useFlags } from '../services/APIService';
import useResizer from '../utils/useResizer';

const SCALE_FACTOR_WIDTH = 1800;
const SCALE_FACTOR_RATIO = 1.5;
const MOBILE_BREAKPOINT = 500;
const Y_OFFSET_MOBILE = 140;
const Y_OFFSET = 70;
const MAX_ZOOM_FACTOR = 4;
const MIN_ZOOM_FACTOR = 0.5;

const styles = {
  parent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    maxWidth: 'unset !important',
    margin: '0px',
    padding: '0px',
    backgroundColor: Theme.light.background
  },
  show: {
    opacity: '1.0',
    transition: '1s',
    padding: '0px !important',
    margin: '0px',
  },
  hide: {
    opacity: '0.0',
    transition: '1s'
  },
  header: {
    width: '100%'
  },
  pin: {
    fill: Theme.light.primary,
    transition: 'opacity 0.5s',
    fontSize: '1px',
    height: '20px',
    width: '20px',
    '&:hover': {
      fill: Theme.light.secondary,
      transition: 'fill 0.5s'
    },
  },
  
};

function Chart({ pins, flags }) {
  const width = '100%';
  const height = '100%';

  const screenDimensions = useResizer();

  const svgRef = useRef();
  const [k, setK] = useState(screenDimensions.isMobile ? (window.innerHeight - 150) * SCALE_FACTOR_RATIO / SCALE_FACTOR_WIDTH : 0.7);
  const [x, setX] = useState(screenDimensions.isMobile ? -100 : (window.innerWidth / 20));
  const [y, setY] = useState(window.innerWidth < MOBILE_BREAKPOINT ? Y_OFFSET_MOBILE : Y_OFFSET);
  useEffect(() => {
    const zoom = d3.zoom().scaleExtent([MIN_ZOOM_FACTOR, MAX_ZOOM_FACTOR]).on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(screenDimensions.isMobile ? k * ((window.innerHeight - 150) * SCALE_FACTOR_RATIO/SCALE_FACTOR_WIDTH): (0.7 * k));
      setX(screenDimensions.isMobile ? x-100 : x+(window.innerWidth/20));
      setY(window.innerWidth < MOBILE_BREAKPOINT ? y + Y_OFFSET_MOBILE : y + Y_OFFSET);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg ref={svgRef} width={width} height={height}>
      <g width={'100%'} height={'100%'} transform={`translate(${x},${y})scale(${k})`}>
        <Deutschland />
        {pins && pins.hochschulen && <Pins pins={pins} k={k} />}
        {flags && flags.length && <Flags flags={flags} k={k} />}
      </g>
    </svg>
  );
}

function Map() {
  const [show, setShow] = useState(false);
  const pins = usePins();
  const flags = useFlags();

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Container sx={show ? { ...styles.parent, ...styles.show } : { ...styles.parent, ...styles.hide }}>
        <Chart pins={pins} flags={flags} />
      </Container>
    </>
  );
}

export default Map;
