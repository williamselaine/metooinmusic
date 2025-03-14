import { styled } from '@mui/material/styles';

const FallInG = styled('g')(({ offset }) => ({
    animation: `slidedown 1000ms ease-out forwards`,
    animationDelay: `${2000 + offset }ms`,
    opacity: 0,
    '@keyframes slidedown': {
      '0%' : { opacity: 1, transform: 'translateY(100%)' },
      '100%': { opacity: 1, transform: 'translateY(0%)' },
    }
}));

const GrowG = styled('g')(({ offset }) => ({
    animation: `grow 1000ms ease-out forwards`,
    animationDelay: `${400 + offset }ms`,
    opacity: 0,
    '@keyframes grow': {
      '0%': {transform: 'scale(0)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    }
}));

export { FallInG, GrowG };