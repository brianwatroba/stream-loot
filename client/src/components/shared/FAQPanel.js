import React, { useState } from "react";
import tw from "twin.macro";
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
      <ToggleButtonGroup>
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
      </ToggleButtonGroup>

      <Panel>
        {FAQS[category].map((faq) => (
          <FAQ
            id={FAQS[category].indexOf(faq) + 1}
            question={faq[0]}
            answer={faq[1]}
            expanded={expanded}
            handleExpand={handleExpand}
          />
        ))}
      </Panel>
    </>
  );
};

const FAQ = ({ id, handleExpand, question, answer, expanded }) => {
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
      className={`py-2 px-6 text-sm md:py-3 md:px-9 md:text-lg font-bold rounded flex flex-row items-center ${
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

const ToggleButtonGroup = tw.div`bg-[#8F5AE8] p-2 flex flex-row rounded-lg`;
const Panel = tw.div`mt-4 mb-12 border-2 border-[#e0e0e0] rounded-lg bg-[#FFFCF5] w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5`;

export default FAQPanel;
