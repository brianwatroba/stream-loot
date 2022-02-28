import React from "react";
import Link from "./Link";
import slLogo from "../images/sllogo.png";

const Navbar = () => {
  return (
    <div className="flex flex-row grow justify-between p-6">
      <img src={slLogo} className="h-5 lg:h-7" alt="Stream Loot Logo"></img>
      <div className="hidden lg:flex flex-row space-x-6">
        <Link title="Home" active="true" />
        <Link title="My loot" />
        <Link title="Learn more" />
        <Link title="About us" />
      </div>
    </div>
  );
};

export default Navbar;
