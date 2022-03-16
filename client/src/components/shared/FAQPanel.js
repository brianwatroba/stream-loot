import React, { useState } from "react";
import { FAQEntry } from "../componentsIndex";
import {
  twitchpartnericon,
  twitchfollowericon,
} from "../../images/imagesIndex";
import FAQS from "../../constants/FAQs";

const FAQPanel = () => {
  const [category, setCategory] = useState("streamers");
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (panel) => () => {
    expanded === panel ? setExpanded(false) : setExpanded(panel);
  };
  const handleToggle = (e) => {
    const selectedCategory = e.target.innerText.toLowerCase();
    setCategory(selectedCategory);
  };

  return (
    <>
      <div className="bg-[#8F5AE8] p-2 flex flex-row rounded-lg mb-2">
        <ToggleButton
          category={category}
          handleToggle={handleToggle}
          img={twitchpartnericon}
        >
          Streamers
        </ToggleButton>
        <ToggleButton
          category={category}
          handleToggle={handleToggle}
          img={twitchfollowericon}
        >
          Viewers
        </ToggleButton>
      </div>
      <div className="flex flex-col p-4 rounded-lg mb-12 mx-8 lg:mx-0 w-11/12 lg:w-3/5 xl:w-2/5  self-center">
        <div className="border-2 border-[#e0e0e0] rounded-lg bg-[##FFFCF5]">
          {FAQS[category].map((faq) => (
            <FAQEntry
              id={FAQS[category].indexOf(faq) + 1}
              question={faq[0]}
              answer={faq[1]}
              expanded={expanded}
              handleExpand={handleExpand}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ToggleButton = ({ children, handleToggle, category, img }) => {
  // const handleClick = (e) => {
  // console.log(e);
  // setFaqCategory(e.target.value.toLowerCase());
  // };
  console.log(children);
  return (
    <button
      className={`py-3 px-12 font-bold rounded flex flex-row items-center ${
        category === children.toLowerCase()
          ? " bg-white text-[#8F5AE8]"
          : "text-white"
      }`}
      onClick={(e) => handleToggle(e)}
    >
      <img src={img} alt={children} className="h-5 mr-2" />
      {children}
    </button>
  );
};

export default FAQPanel;
