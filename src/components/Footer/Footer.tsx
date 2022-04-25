import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/footerbg.png";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    display: "flex",
  },
  img: {},
  text: {
    position: "absolute",
    width: "100%",
    top: "50%",
    left: 0,
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: "70%",
    },
  },
}));

interface Props {}

const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        className={clsx(classes.text, "styleFont")}
        align="center"
      >
        All Rights Reserved. CRYPTORUNNER 2021.
      </Typography>
      <img alt="" src={Bg} width="100%" className={classes.img} />
    </div>
  );
};

export default Footer;
