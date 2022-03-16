import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export default FAQEntry;
