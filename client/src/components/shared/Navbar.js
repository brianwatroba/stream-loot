import React from "react";
import tw from "twin.macro";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { sllogo } from "../../images/imagesIndex";
import navbarLinks from "../../constants/navbarLinks";

const Navbar = () => {
  return (
    <AppBar>
      <Logo />
      <button className="py-3 px-6 flex bg-white items-center sm:text-xs md:text-sm rounded-md font-serif font-bold text-black33 hover:bg-[#EEEEEE]">
        LAUNCH APP
        <ArrowForwardRoundedIcon fontSize="small" sx={{ marginLeft: "4px" }} />
      </button>
      {/* <NavLinks /> */}
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
const AppBar = tw.div`flex flex-row justify-between items-center p-6`;
const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <img
      src={sllogo}
      alt="Stream Loot Logo"
      className="h-5 lg:h-6 mb-2 md:mb-0 cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default Navbar;
