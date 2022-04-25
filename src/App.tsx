import { Container } from "@mui/material";
import React, { useEffect } from "react";
import "./App.css";
import Routes from "src/routes/Routes";
import { ThemeProvider } from "@mui/material";
import theme from "./util/theme";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
// import { useWallet } from '@binance-chain/bsc-use-wallet'

const App: React.FC = () => {
  // const { account, connect, reset } = useWallet()
  // useEffect(() => {
  //   if (!account && window.localStorage.getItem('accountStatus')) {
  //     connect('injected')
  //   }
  // }, [account, connect])
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" disableGutters>
        <div className="mainContainer">
          <Navbar />
          <div>
            <Routes />
          </div>
          <Footer />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
