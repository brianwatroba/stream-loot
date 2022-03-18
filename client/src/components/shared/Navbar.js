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
      <NavButton>
        LAUNCH APP
        <ArrowForwardRoundedIcon fontSize="small" sx={{ marginLeft: "4px" }} />
      </NavButton>
    </AppBar>
  );
};

const NavButton = tw.button`hidden md:flex py-2 px-4 md:py-3 md:px-6  bg-white items-center text-xs md:text-sm rounded-md font-serif font-bold text-black33 hover:bg-[#EEEEEE]`;
const AppBar = tw.div`flex flex-row justify-center md:justify-between items-center p-6`;
const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <img
      src={sllogo}
      alt="Stream Loot Logo"
      className="h-4 lg:h-6 mb-2 md:mb-0 cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default Navbar;
