import React from "react";

interface AvatarProps {
  name: string;
  seed: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, seed, className = "h-full w-full" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Deterministic colors based on seed string
  const brandColors = ["#F38615", "#F7511D", "#1D1D1D", "#FDF9B4"];
  const charSum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const bgColor = brandColors[charSum % brandColors.length];
  const secondaryColor = brandColors[(charSum + 1) % brandColors.length];
  const patternType = charSum % 3; // 3 different geometric pattern styles

  return (
    <svg
      className={`${className} select-none`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill={bgColor} />
      
      {/* Abstract geometric patterns representing artistic character */}
      {patternType === 0 && (
        <>
          <circle cx="50" cy="50" r="40" fill={secondaryColor} opacity="0.3" />
          <polygon points="10,90 50,20 90,90" fill="#FFFFFE" opacity="0.15" />
        </>
      )}
      {patternType === 1 && (
        <>
          <rect x="15" y="15" width="70" height="70" rx="10" fill={secondaryColor} opacity="0.25" />
          <circle cx="50" cy="50" r="25" fill="#FFFFFE" opacity="0.2" />
        </>
      )}
      {patternType === 2 && (
        <>
          <polygon points="50,10 90,50 50,90 10,50" fill={secondaryColor} opacity="0.3" />
          <line x1="10" y1="10" x2="90" y2="90" stroke="#FFFFFE" strokeWidth="4" opacity="0.15" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="#FFFFFE" strokeWidth="4" opacity="0.15" />
        </>
      )}

      {/* Initials Text */}
      <text
        x="50%"
        y="53%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={bgColor === "#FDF9B4" ? "#1D1D1D" : "#FFFFFE"}
        fontSize="34"
        fontWeight="900"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-0.05em"
      >
        {initials}
      </text>
    </svg>
  );
};
