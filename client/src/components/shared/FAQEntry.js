import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQEntry = ({ id, handleChange, question, answer, expanded }) => {
  return (
    <Accordion
      expanded={expanded === `panel${id}`}
      onChange={handleChange(`panel${id}`)}
      elevation="0"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${id}bh-content`}
        id={`panel${id}bh-header`}
        className="text-black50 font-medium font-sans"
      >
        {question}
      </AccordionSummary>
      <AccordionDetails className="text-black80 font-normal font-sans">
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQEntry;
