import React from "react";

const FeatureItem = ({ imgSrc, title, subtitle, alt }) => {
  return (
    <div className="align-center justify-center text-center">
      <div className="flex align-center justify-center">
        <img src={imgSrc} className="h-24 w-30 lg:h-32 lg:w-50" alt={alt} />
      </div>
      <div className="text-center font-serif font-bold text-black33 text-3xl mt-4">
        {title}
      </div>
      <div className="flex justify-center align-center font-sans text-black80 text-lg mt-2">
        <div className="text-center w-1/2">{subtitle}</div>
      </div>
    </div>
  );
};

export default FeatureItem;
