import { useState, useEffect } from 'react';
import { Card, Container, Link } from '@mui/material';
import Theme from '../constants/Theme';

const styles = {
  parent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: Theme.light.background
  },
  show: {
    opacity: '1.0',
    transition: '1s'
  },
  hide: {
    opacity: '0.0',
    transition: '1s'
  },
  header: {
    width: '100%'
  },
  card: {
    padding: '2em 12px',
    textAlign: 'center',
    maxWidth: '600px',
    boxShadow: '0px 10px 20px rgba(77, 97, 108, .24)',
    borderRadius: '4px',
    backgroundColor: Theme.light.primary,
    '& a': {
      color: Theme.light.tertiary,
      textDecorationColor: Theme.light.tertiary,
      fontWeight: 600
    }
  }
};

function About() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Container sx={show ? { ...styles.parent, ...styles.show } : { ...styles.parent, ...styles.hide }}>
        <Card sx={styles.card}>
          <p>🛠️ Under construction! Check back soon 🧰</p>
          <Link href='https://gofund.me/5f1c7f9e'>Support us on GoFundMe</Link>
        </Card>
      </Container>
    </>
  );
}

export default About;
