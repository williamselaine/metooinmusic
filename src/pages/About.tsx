import { Card, Container, Link } from "@mui/material";

const styles = {
  parent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  },
  header: {
    width: "100%",
  },
  card: {
    padding: "2em 0px",
    textAlign: "center",
    width: "100%",
    boxShadow: "0px 10px 20px rgba(77, 97, 108, .24)",
    borderRadius: "4px",
  }
}

function About() {

  return (
    <>
      <Container sx={styles.parent}>
        <Card sx={styles.card}>
          <p>
            🛠️ Site under construction! Check back soon 🧰
          </p>
          <Link href="https://gofund.me/5f1c7f9e">Support us on GoFundMe</Link>
        </Card>
      </Container>

    </>
  )
}

export default About;
