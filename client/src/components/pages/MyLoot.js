import React from "react";
import tw from "twin.macro";
import { Navbar, FeatureItem, FAQPanel, Button } from "../componentsIndex";

const MyLoot = () => {
  return (
    <>
      <GradientBackground>
        <Navbar />
      </GradientBackground>
    </>
  );
};

const GradientBackground = tw.div`bg-gradient-to-b from-[#e7d7ff] to-white`;

export default MyLoot;
