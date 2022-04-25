import React from "react";
import Social from "../../components/Social/Social";
import Features from "./components/Features";
import Roadmap from "./components/Roadmap";
import Row1 from "./components/Row1";
import Team from "./components/Team";
import Trailer from "./components/Trailer";

const Home: React.FC = () => {

  return (
    <div>
      <Row1 />
      <Features />
      <Trailer />
      <Roadmap />
      <Team />
      <Social />
    </div>
  );
};

export default Home;
