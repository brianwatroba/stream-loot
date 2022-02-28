import React from "react";

const Link = ({ active, href, title }) => {
  return (
    <div
      className={`text-black33-500 ${
        active ? "font-bold " : " "
      }font-sans cursor-pointer`}
      onClick={() => {
        if (href) window.location = href;
      }}
    >
      {title}
    </div>
  );
};

export default Link;
