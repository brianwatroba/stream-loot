import React from "react";
import tw from "twin.macro";
import { useLocation, useNavigate } from "react-router-dom";
import { sllogo } from "../../images/imagesIndex";
import navbarLinks from "../../constants/navbarLinks";

const Navbar = () => {
  return (
    <AppBar>
      <Logo />
      <NavLinks />
    </AppBar>
  );
};

const NavLink = ({ active, href, title }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(href);
  return (
    <div
      onClick={handleClick}
      className={`text-sm md:text-base text-black50 font-sans cursor-pointer${
        active ? " font-bold text-black" : ""
      }`}
    >
      {title}
    </div>
  );
};

const NavLinks = () => {
  const location = useLocation();
  return (
    <div className="hidden md:flex flex-row space-x-6 justify-center">
      {navbarLinks.map((link, index) => (
        <NavLink
          title={link[0]}
          href={link[1]}
          key={index}
          active={link[1] === location.pathname}
        />
      ))}
    </div>
  );
};
const AppBar = tw.div`flex flex-col md:flex-row md:flex-grow justify-between p-6`;
const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <img
      src={sllogo}
      alt="Stream Loot Logo"
      className="h-5 lg:h-7 mb-2 md:mb-0 cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default Navbar;
