import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Theme, Typography } from "@mui/material";
import Bg from "src/assets/images/orangebg.jpg";
import CheckIcon from "@mui/icons-material/Check";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    backgroundSize: "cover",
    paddingTop: 50,
    paddingBottom: 50
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 360,
  },
  line: {
    margin: "auto",
    height: "calc(100% - 30px)",
    width: 5,
    background: "white",
  },
  roadmapPoint: {
    display: "flex",
    alignItems: "center",
  },
  checkIcon: {
    marginRight: 10,
  },
}));

interface Props { }

const allRoadmaps: RoadmapPointProps[] = [
  {
    title: "Phase 1",
    points: [
      // {item1: "Characters design", status: "active"}
      "Characters design",
      "Website and socials",
      "Audit Contract",
      "Release whitepaper",
      "CryptoRunner 2D testnet",
      "NFT presale",
      "IDO"
    ],
  },
  {
    title: "Phase 2",
    points: [
      "Launch on PancakeSwap",
      "Coingecko, Coinmarketcap Listing",
      "Staking Mechanism",
      "2D game release",
      "Public Launch NFT Marketplace",
    ],
  },
  {
    title: "Phase 3",
    points: [
      "Certik audit",
      "Influencer Marketing",
      "CEX Listing",
      "Team Expansion",
      "Game studio / partnerships"
    ],
  },
  {
    title: "Phase 4",
    points: [
      "3D game soft launch",
      "Full game release",
      "More exchanges",
      "Full Metaverse integration",
      "Android/IOS version",
      "Marketing in local Communities",
      "Web and android Update",
      "Global tournament"
    ],
  },
];

const Roadmap: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" color="textSecondary" align="center">
        <b>Roadmap</b>
      </Typography>
      <Grid container style={{ paddingLeft: 20, marginTop: 50}}>
        {allRoadmaps.map((roadmap) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={uuid()}>
            <RoadmapPoint {...roadmap} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Roadmap;

const RoadmapPoint: React.FC<RoadmapPointProps> = ({ title, points }) => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 10 }}>
        <div className={classes.circle} />
        <div className={classes.line} />
      </div>
      <div>
        <Typography
          color="textSecondary"
          variant="h5"
          style={{ marginBottom: 20, marginTop: 5 }}
        >
          {title}
        </Typography>
        {points.map((item) => (
          <Typography
            key={uuid()}
            color="textSecondary"
            className={classes.roadmapPoint}
          >
            <CheckIcon className={classes.checkIcon} /> {item}
          </Typography>
        ))}
      </div>
    </div>
  );
};

interface RoadmapPointProps {
  title: string;
  points: string[];
}
