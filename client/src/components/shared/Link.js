import React from "react";

const Link = ({ active, href, title }) => {
  return (
    <div
      className={`text-sm md:text-base text-black50 ${
        active ? "font-bold text-black" : " "
      }font-sans cursor-pointer `}
      onClick={() => {
        if (href) window.location = href;
      }}
    >
      {title}
    </div>
  );
};

export default Link;
