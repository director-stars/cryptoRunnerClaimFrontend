import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Container, Theme, Typography } from "@mui/material";
import CloudsPng from "src/assets/images/clouds.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 30,
  },
  container: {
    position: "relative",
    paddingBottom: 250,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 50,
    },
  },
  btnsDiv: {
    display: "grid",
    gap: 20,
    gridAutoFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  video: {
    width: "100%",
    border: "6px solid white",
    maxWidth: 410,
  },
  clouds: {
    width: "100%",
    objectFit: "contain",
    position: "absolute",
    bottom: -50,
    left: 0,
    pointerEvents: "none",
  },
}));

interface Props {}

const Trailer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <Typography
          color="textSecondary"
          align="center"
          style={{ lineHeight: 2 }}
        >
          Cryptorunner embodies the play to earn mechanism like no other, the
          easy to play game enables gamers of all experience levels to have fun
          running and earning. Cryptorunner is a huge step at fostering
          mainstream adoption of blockchain NFT gaming.
        </Typography>
        <div className={classes.btnsDiv}>
          <Button variant="contained" color="secondary">
            Play
          </Button>
          <Button variant="contained" href="https://docs.cryptorunner.io" target="_blank">Whitepaper</Button>
        </div>
        <Typography
          variant="h4"
          color="textSecondary"
          align="center"
          className="styleFont"
          style={{ marginTop: 50, marginBottom: 40 }}
        >
          <b>CryptoRunner Trailer Video</b>
        </Typography>
        <div className="center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/yHOczvb8XQU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          {/* <video
            className={classes.video}
            controls
            src={"http://techslides.com/demos/sample-videos/small.mp4"}
          /> */}
        </div>
        <img alt="" src={CloudsPng} className={classes.clouds} />
      </Container>
    </div>
  );
};

export default Trailer;
