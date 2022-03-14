import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, href }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    if (href) navigate(href);
  };
  return (
    <button
      onClick={handleClick}
      className="flex bg-primary py-3 px-6 md:py-4 md:px-8 font-black text-white font-serif text-center align-center justify-center self-center rounded-md hover:bg-primary-light"
    >
      {children}
    </button>
  );
};

export default Button;
