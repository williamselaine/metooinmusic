import { GrowG } from './AnimatedG';
import PlaceIcon from '@mui/icons-material/Place';
import Tooltip from '@mui/material/Tooltip';
import Theme from '../constants/Theme';

const styles = {
    pin: {
      fill: Theme.light.primary,
      transition: 'opacity 0.5s',
      fontSize: '1px',
      height: '15px',
      width: '15px',
      '&:hover': {
        fill: Theme.light.secondary,
        transition: 'fill 0.5s'
      },
    },
    
  };

function Pins({ pins, k }) {
    return (
        <g>
        {pins.hochschulen.map((pin, index) => {
            return (
            <GrowG key={index} offset={index * 30}>
                <g transform={`translate(${pin.longitude * 82 - 253 + (k < 0.9 ? 5 * k : 5 * k)},${(55 - pin.latitude) * 137 + 80 + (k < 0.9 ? -5 * k : -10 + 5 * k) })`}>
                <Tooltip title={pin.name} placement={'top'}>
                <PlaceIcon sx={styles.pin} width={50 / Math.max(1, k)} height={50 / Math.max(1, k)} />
                </Tooltip>
                </g>
            </GrowG>
            )
        })}
        </g>
    );
}

export default Pins;