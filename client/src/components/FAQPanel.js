import React, { useState } from "react";
import FAQEntry from "./FAQEntry";

const FAQPanel = ({ faqs, backgroundColor }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col p-4 bg-[#FFF7E2] rounded-lg mb-12 mx-8 lg:mx-0 lg:w-2/3 self-center">
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
