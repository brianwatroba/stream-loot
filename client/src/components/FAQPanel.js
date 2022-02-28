import React, { useState } from "react";
import FAQEntry from "./FAQEntry";

const FAQPanel = ({ faqs }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className=" p-4 bg-[#FFF7E2] rounded-md mx-2">
      {faqs.map((faq) => (
        <FAQEntry
          id={faqs.indexOf(faq) + 1}
          question={faq[0]}
          answer={faq[1]}
          expanded={expanded}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default FAQPanel;
