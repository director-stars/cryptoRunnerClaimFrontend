import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Theme } from "@mui/material";
import TwitterPng from "src/assets/icons/twitter.png";
import MediumPng from "src/assets/icons/medium.png";
import TelegramPng from "src/assets/icons/telegram.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 0px",
  },
}));

interface Props {}

const Social: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <IconButton href="https://twitter.com/cryptorunnerbsc" target="_blank">
          <img src={TwitterPng} alt="twitter" width="50px" />
        </IconButton>
        <IconButton href="https://medium.com/@cryptorunner" target="_blank">
          <img src={MediumPng} alt="discord" width="50px" />
        </IconButton>
        <IconButton href="https://t.me/CryptoRunners" target="_blank">
          <img src={TelegramPng} alt="telegram" width="50px" />
        </IconButton>
      </div>
    </div>
  );
};

export default Social;
