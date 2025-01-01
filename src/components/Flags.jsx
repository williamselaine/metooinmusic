import FlagIcon from '@mui/icons-material/Flag';
import { FallInG } from './AnimatedG';
import Tooltip from '@mui/material/Tooltip';
import Theme from '../constants/Theme';

const styles = {
    flag: {
      fill: Theme.light.tertiary,
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

function Flags({ flags, k }) {
    return (
        <g>
        {flags.map((flag, index) => {
            return (
            <FallInG key={index} offset={index * 30}>
                <g transform={`translate(${flag.longitude * 82 - 270 + (k < 0.9 ? 5 * k : 5 * k)},${(55 - flag.latitude) * 137 + 80 + (k < 0.9 ? -5 * k : -10 + 5 * k) })`}>
                <Tooltip title={flag.name} placement={'top'}>
                    <FlagIcon sx={styles.flag} width={40 / Math.max(1, k)} height={40 / Math.max(1, k)} />
                </Tooltip>
                </g>
            </FallInG>
            )
        })}
        </g>
    );
}

export default Flags;