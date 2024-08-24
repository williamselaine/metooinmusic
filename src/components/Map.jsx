
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import Deutschland from '../assets/deutschland';
import Theme from '../constants/Theme';
import * as d3 from 'd3';
import { db } from '../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import PlaceIcon from '@mui/icons-material/Place';
import Tooltip from '@mui/material/Tooltip';

const SCALE_FACTOR_WIDTH = 1800;
const SCALE_FACTOR_RATIO = 1.5;
const MOBILE_BREAKPOINT = 500;
const Y_OFFSET_MOBILE = 140;
const Y_OFFSET = 70;

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
    }
  },
};

function ZoomableSVG({ children, width, height }) {
  const svgRef = useRef();
  const [k, setK] = useState(window.innerWidth < SCALE_FACTOR_WIDTH ? window.innerWidth * SCALE_FACTOR_RATIO / SCALE_FACTOR_WIDTH : 1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(window.innerWidth < MOBILE_BREAKPOINT ? Y_OFFSET_MOBILE : Y_OFFSET);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(window.innerWidth < SCALE_FACTOR_WIDTH ? k * (window.innerWidth * SCALE_FACTOR_RATIO/SCALE_FACTOR_WIDTH): k);
      setX(x);
      setY(window.innerWidth < MOBILE_BREAKPOINT ? y + Y_OFFSET_MOBILE : y + Y_OFFSET);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg ref={svgRef} width={width} height={height}>
      <g width={'100%'} height={'100%'} transform={`translate(${x},${y})scale(${k})`}>
        <Deutschland />
        {children}
      </g>
    </svg>
  );
}

function Pins({ pins }) {
  const pinRefs = useRef([]);
  useEffect(() => {
    pinRefs.current = pinRefs.current.slice(0, pins.hochschulen.length);
  }, [pins.hochschulen]);

  return (
    <g>
      {pins.hochschulen.map((pin, index) => {
        return (
          <g key={index}transform={`translate(${pin.longitude * 82 - 253},${(55 - pin.latitude) * 138 + 70})`}>
          <Tooltip title={pin.name} placement={'top'}>
            <PlaceIcon sx={styles.pin} width={50} height={50} ref={el => pinRefs.current[index] = el}  onMouseOver={() => {
              //  todo
                // var sel = d3.select(pinRefs.current[index]);
                // sel.raise();
            }}/>
          </Tooltip>
          </g>
        )
      })}
    </g>
  );
}

function Chart({ pins }) {
  console.log('cjart', pins);
  const width = '100%';
  const height = '100%';
  return (
    <ZoomableSVG width={width} height={height}>
      {pins && pins.hochschulen && <Pins pins={pins}/>}
    </ZoomableSVG>
  );
}

function Map() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const [pins, setPins] = useState([]);

  useEffect(() => {
    let _pins;
    const getPins = async () => {
      const docRef = doc(db, "api", "pins");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        _pins = docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setPins(_pins);
    };
    getPins();
  }, []);

  useEffect(() => {
    console.log(pins);
  }, [pins])

  return (
    <>
      <Container sx={show ? { ...styles.parent, ...styles.show } : { ...styles.parent, ...styles.hide }}>
        <Chart pins={pins} />
      </Container>
    </>
  );
}

export default Map;
