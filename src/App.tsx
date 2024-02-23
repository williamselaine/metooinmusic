import { Box, Link } from "@mui/material";

import "./App.css";

const styles = {
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
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

function App() {

  return (
    <>
      <Box sx={styles.parent}>
        <Box component="h1">Mapping MeToo in Music</Box>
        <Box sx={styles.card}>
          <p>
            🛠️ Site under construction! Check back soon 🧰
          </p>
          <Link href="https://gofund.me/5f1c7f9e">Support us on GoFundMe</Link>
        </Box>
      </Box>

    </>
  )
}

export default App
