import React from "react";

const TextBanner = () => {
  const items = [
    "FORMULATED BY US",
    "TESTED BY US",
    "FREE SKIN CONSULTS ALWAYS",
    "PERFECTED FOR YOU",
  ];

  return (
    <div className="w-screen bg-primary py-5 overflow-hidden">
      {/* Inline CSS animation so no tailwind.config.js needed */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .marquee-track {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>

      <div className="marquee-track flex w-max gap-9 whitespace-nowrap font-display text-sm tracking-wide text-white md:text-2xl">
        {[...items, ...items].map((text, index) => (
          <React.Fragment key={index}>
            <span>◆</span>
            <p>{text}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TextBanner;
