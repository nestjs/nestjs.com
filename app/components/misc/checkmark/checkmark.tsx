import React from "react";

type CheckmarkProps = {
  size?: number;
  className?: string;
};

const Checkmark: React.FC<CheckmarkProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-dasharray-24 stroke-dashoffset-24 animate-draw"
      />
      <style>
        {`
          .stroke-dasharray-24 {
            stroke-dasharray: 24;
          }
          .stroke-dashoffset-24 {
            stroke-dashoffset: 24;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-draw {
            animation: draw 0.5s ease forwards;
          }
        `}
      </style>
    </svg>
  );
};

export default Checkmark;
