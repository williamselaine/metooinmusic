import { useState, useEffect } from 'react';
import { Card, Container, IconButton, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import Theme from '../constants/Theme';
import useResizer from '../utils/useResizer';

function About() {
  const [show, setShow] = useState(false);
  const screenDimensions = useResizer();

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
      padding: '1em 20px',
      textAlign: 'left',
      maxWidth: screenDimensions.isMobile ? '300px' : '600px',
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto',
      marginTop: screenDimensions.isMobile ? '200px' : '100px',
      boxShadow: '0px 10px 20px rgba(77, 97, 108, .24)',
      borderRadius: '4px',
      backgroundColor: Theme.light.primary,
      '& a': {
        color: Theme.light.tertiary,
        textDecorationColor: Theme.light.tertiary,
        fontWeight: 600
      }
    },
    para: {
      textAlign:'left'
    },
    linkbar: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    linkItems: {
      marginTop: '-20px',
      display: 'flex',
      flexDirection: 'row',
    },
    linkItem: {
      margin: '0px 12px',
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Container sx={show ? { ...styles.parent, ...styles.show } : { ...styles.parent, ...styles.hide }}>
        <Card sx={styles.card}>
          <p>Auf dieser digitalen Karte könnt ihr individuell und anonym eine Musikhochschule mit einer #RedFlag versehen: Somit wird für alle sichtbar angezeigt, dass es dort zu einem Übergriff gekommen ist. 
            Dabei ist nicht relevant, inwiefern dieser Übergriff justiziabel ist, oder wann er stattgefunden hat, sondern allein die Tatsache, dass es zu einer Grenzüberschreitung oder einer Gewalttat kam – sei es in Form verbaler Übergriffe bis hin zu sexualisierter Gewalt. 
            Betroffene Personen können hier eigenständig tätig werden und die Meldung einer #RedFlag 
            selbst vornehmen. 
          </p>
          <h4>Zum Hintergrund:</h4>
          <p>Noch immer gibt es für Betroffene von Machtmissbrauch zu wenig Anlaufstellen, explizit im 
            Klassikbereich. Auch herrscht zu viel Stillschweigen darüber, wo Grenzen überschritten 
            werden. Eine jahrhundertealte Ideengeschichte bildet ein Fundament, das Machtmissbrauch 
            romantisiert, tabuisiert und in den Bereich des Akzeptablen verschiebt. 
            Einzelunterricht hinter verschlossener Tür und Abhängigkeit zur Lehrperson, die über die 
            erfolgreiche oder weniger erfolgreiche künstlerische Zukunft eines jungen Menschen 
            entscheidet, bereiten gleichfalls den Nährboden für Machtmissbrauch. Auch ist die Welt der 
            klassischen Musik noch immer von einem weißen und cis-männlichen Geniekult geprägt, 
            dem man im Hochschul- gleichermaßen wie auch im Konzertbetrieb, aber auch in der 
            wissenschaftlichen wie feuilletonistischen Wissensproduktion alltäglich begegnet. </p>
          <h4>Über uns:</h4>
          <p>
            Wir sind ein Team aus Musiker*innen und Musikwissenschaftler*innen, die selber von Machtmissbrauch betroffen waren und die diese Gewalt innerhalb der Hochschulen endlich sichtbar machen wollen.
          </p>
          <Box sx={styles.linkbar}>
              <h4>Kontakt:</h4>
              <Box sx={styles.linkItems}>
                <IconButton href="mailto:info@mappingmetooinmusic.de"><EmailIcon sx={{color: '#213547'}} /></IconButton>
                <IconButton color={'primary'} href={'https://www.instagram.com/mapping_metoo_in_music/'}><InstagramIcon sx={{color: '#213547'}} /></IconButton>
              </Box>
          </Box> 
        </Card>
      </Container>
    </>
  );
}

export default About;
