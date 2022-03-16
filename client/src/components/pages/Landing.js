import React from "react";
import { Navbar, FeatureItem, FAQPanel, Button } from "../componentsIndex";
import tw from "twin.macro";
import {
  chain,
  controller,
  viewer,
  crystals,
  polygon,
  chest2,
  ninjasupport,
} from "../../images/imagesIndex";

const Landing = () => {
  return (
    <>
      <GradientBackground>
        <Navbar />
        <Section>
          <BannerImg src={ninjasupport} alt="Ninja Support" />
          <Title className="mt-4">
            Support streamers, <br></br>get crypto
          </Title>
          <Subtitle className="my-8">
            Turn your channel’s donations and subs<br></br>into crypto-based
            rewards for fans
          </Subtitle>
          <Button href="/">LAUNCH APP</Button>
          <SectionSubtitle className="mt-4">
            Beta launching spring 2022
          </SectionSubtitle>
        </Section>
      </GradientBackground>
      <Section>
        <SectionTitle className="mb-8 lg:mb-24">How it works</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-11 align-center place-content-center">
          <div />
          <FeatureItem
            title="Customize"
            subtitle="Streamers can customize and mint their own Loot Set on the blockchain, which connects to Twitch donations and subs"
            imgSrc={crystals}
            alt="crystals"
          />
          <FeatureItem
            title="Claim"
            subtitle="As viewers donate and sub on stream, their Stream Loot is automatically reserved. They can mint it on the blockchain on demand"
            imgSrc={chain}
            alt="chain"
          />
          <FeatureItem
            title="Trade"
            subtitle="Loot is decentralized and tradeable. It can be incorporated into promotions, events, and much more."
            imgSrc={polygon}
            alt="polygon"
          />
          <div />
        </div>
      </Section>
      <Section>
        <SectionTitle className="mb-2"> Learn more</SectionTitle>
        <SectionSubtitle className="mb-16">
          FAQs and common questions
        </SectionSubtitle>
        <FAQPanel />
      </Section>
      <FlexColumn className="bg-gradient-to-t from-[#FFFAED] to-white">
        <Section>
          <FeatureItem title="View your loot" imgSrc={chest2} alt="chest" />
          <SectionSubtitle className="mb-8">
            Log into Twitch to see what's waiting
          </SectionSubtitle>
          <Button href="/">LAUNCH APP</Button>
          <SectionSubtitle className="mt-4">
            Beta launching spring 2022
          </SectionSubtitle>
        </Section>
      </FlexColumn>
    </>
  );
};

const Section = tw.div`flex flex-col justify-center items-center py-28 lg:py-48 w-full`;
const Title = tw.div`text-4xl font-serif font-black text-black text-center lg:text-7xl`;
const Subtitle = tw.div`text-lg lg:text-2xl text-black80 font-normal font-sans text-center`;
const SectionTitle = tw.div`text-3xl font-serif font-bold text-black33 text-center lg:text-4xl`;
const SectionSubtitle = tw.div`flex justify-center text-lg text-black80 font-normal font-sans text-center italic`;
const GradientBackground = tw.div`bg-gradient-to-b from-[#e7d7ff] to-white`;
const FlexColumn = tw.div`flex flex-col justify-center items-center`;

const BannerImg = (props) => (
  <img className="h-24 w-30 lg:h-32 lg:w-50" src={props.src} alt={props.alt} />
);

export default Landing;
