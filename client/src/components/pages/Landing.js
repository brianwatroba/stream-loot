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
import FAQs from "../../constants/FAQs";

const Landing = () => {
  return (
    <>
      <GradientBackground>
        <Navbar />
        <Section>
          <FlexColumn className="py-24">
            <img
              src={ninjasupport}
              className="h-24 w-30 lg:h-32 lg:w-50 lg:mt-14"
              alt="Ninja Support"
            />
            <Title className="mt-4">
              Support streamers, <br></br>get crypto
            </Title>
            <Subtitle className="my-8">
              Turn your channel’s donations and subs<br></br>into crypto-based
              rewards for fans
            </Subtitle>
            <Button href="/myloot">GET STARTED</Button>
          </FlexColumn>
        </Section>
      </GradientBackground>

      <SectionTitle className="mt-48 mb-8 lg:mb-24">How it works</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-11 align-center place-content-center lg:mb-48">
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
      <SectionTitle className="mt-48 mb-2"> Learn more</SectionTitle>
      <SectionSubtitle className="mb-16">
        FAQs and common questions
      </SectionSubtitle>
      <div className="flex flex-col lg:flex-row lg:items-start justify-center">
        <FlexColumn className="w-full">
          <img src={controller} className="h-10 w-12 mb-2" alt="controller" />
          <SectionSubtitle className="mb-4">Streamers</SectionSubtitle>
          <FAQPanel faqs={FAQs.streamers} />
        </FlexColumn>
        <FlexColumn className="w-full">
          <img src={viewer} className="h-10 w-12 mb-2" alt="controller" />
          <SectionSubtitle className="mb-4">Viewers</SectionSubtitle>
          <FAQPanel faqs={FAQs.viewers} />
        </FlexColumn>
      </div>
      <FlexColumn className="py-36 bg-gradient-to-t from-[#FFFAED] to-white">
        <FeatureItem title="View your loot" imgSrc={chest2} alt="chest" />
        <SectionSubtitle className="mb-8">
          Log into Twitch to see what's waiting
        </SectionSubtitle>
        <Button href="/myloot">GET STARTED</Button>
      </FlexColumn>
    </>
  );
};

const Section = tw.div`flex flex-col justify-center items-center py-20 lg:py-48 w-full`;
const Title = tw.div`text-4xl font-serif font-black text-black text-center lg:text-7xl`;
const Subtitle = tw.div`text-sm lg:text-2xl text-black80 font-normal font-sans text-center`;
const SectionTitle = tw.div`text-3xl font-serif font-bold text-black33 text-center lg:text-4xl`;
const SectionSubtitle = tw.div`flex justify-center text-sm lg:text-lg text-black80 font-normal font-sans text-center italic`;
const GradientBackground = tw.div`bg-gradient-to-b from-[#e7d7ff] to-white`;
const FlexColumn = tw.div`flex flex-col justify-center items-center`;

export default Landing;
