import React from "react";
import { makeStyles } from "@mui/styles";
// import Bg from "src/assets/images/1stpagebg.jpg";
import Bg from "src/assets/images/bg2.png";
import { Theme, Typography, Button } from "@mui/material";
import clsx from "clsx";
import Countdown from "react-countdown";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    position: "relative",
    backgroundSize: "100%",
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    minHeight: "calc(100vh - 80px)",
    backgroundRepeat: "no-repeat",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  btnsDiv: {
    display: "grid",
    gap: 20,
    gridAutoFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  text: {
    position: "relative",
    // fontFamily: "'Orbitron', sans-serif",
    fontWeight: 600,
    [theme.breakpoints.down("lg")]: {
      marginTop: 20,
    },
  },
  alignCenter1: {
    textAlign: "center",
  },
}));

interface Props {}

const Row1: React.FC<Props> = () => {
  const classes = useStyles();

  // Random component
  // const Completionist = () => <span>You are good to go!</span>;

  return (
    <div className={classes.root}>
      <img src={Bg} alt="" className={classes.bg} />
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={clsx(classes.text, "styleFont")}
      >
        RACE. WIN. EARN.
      </Typography>
      <Typography
        variant="h4"
        color="secondary"
        align="center"
        style={{ marginTop: "75px" }}
        className={clsx(classes.text, "styleFont")}
      >
        Cryptorunner - A run to earn NFT gaming built on BSC that rewards players in $BNB
      </Typography>
      {/* <Typography
        variant="h2"
        color="blue"
        align="center"
        className={clsx(classes.text, "styleFont")}
      >
        Countdown to presale on pinksale
      </Typography> */}
      {/* <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={clsx(classes.text, "styleFont")}
      >
        <Countdown date={Date.UTC(2022, 1, 10, 11)}></Countdown>
      </Typography> */}
      <div className={classes.btnsDiv}>
        <Button
          variant="contained"
          href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x42AA843fEA178806F094164C84E88a212FB45F3E&inputCurrency=BNB"
          target="_blank"
          color="secondary"
        >
          Buy $RUN
        </Button>
        <Button
          variant="contained"
          href="https://www.dextools.io/app/pancakeswap/pair-explorer/0x42AA843fEA178806F094164C84E88a212FB45F3E"
          target="_blank"
        >
          Dextools Chart
        </Button>
      </div>
    </div>
  );
};

export default Row1;
