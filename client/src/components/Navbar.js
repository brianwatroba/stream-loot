import React from "react";
import Link from "./Link";
import slLogo from "../images/sllogo.png";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:grow justify-between p-6">
      <div className="flex justify-center mb-2 md:mb-0">
        <img src={slLogo} className="h-5 lg:h-7" alt="Stream Loot Logo"></img>
      </div>
      <div className="hidden md:flex flex-row space-x-6 justify-center">
        <Link title="Home" active="true" />
        <Link title="My loot" />
        <Link title="Learn more" />
        <Link title="About us" />
      </div>
    </div>
  );
};

export default Navbar;
