import React from "react";
import tw from "twin.macro";

const FeatureItem = ({ imgSrc, title, subtitle, alt }) => {
  return (
    <Column>
      <Image imgSrc={imgSrc} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Column>
  );
};

const Column = tw.div`col-span-3 flex flex-col items-center justify-center text-center mt-16 lg:mt-0`;
const Image = ({ imgSrc, alt }) => (
  <img src={imgSrc} className="h-24 w-30 lg:h-32 lg:w-50" alt={alt} />
);
const Title = tw.div`text-center font-serif font-bold text-black33 text-2xl lg:text-3xl mt-4`;
const Subtitle = tw.div`font-sans text-center w-3/4 lg:w-1/2 text-black80 text-lg mt-2`;

export default FeatureItem;
