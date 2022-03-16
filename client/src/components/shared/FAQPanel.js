import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const FAQEntry = ({ id, handleExpand, question, answer, expanded }) => {
  return (
    <Accordion
      expanded={expanded === `panel${id}`}
      onChange={handleExpand(`panel${id}`)}
      elevation="0"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}bh-content`}
        id={`panel${id}bh-header`}
        sx={{
          fontFamily: "open sans",
          fontWeight: "500",
          color: "#505050",
          backgroundColor: "#FFFCF5",
          borderRadius: "8px",
        }}
      >
        {question}
      </AccordionSummary>
      <AccordionDetails className="text-black80 font-normal font-sans">
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

const ToggleButton = ({ children, handleToggle, category, img }) => {
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
