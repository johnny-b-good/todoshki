// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";

/** Loader component */
export const Loader: FC = () => {
  const size = 32;
  const strokeWidth = 4;

  const CIRCLE_LENGTH = Math.PI * (size - strokeWidth);
  const SECTION_LENGTH = (2 / 3) * CIRCLE_LENGTH;

  return (
    <div className="flex-column flex h-full w-full flex-col items-center justify-center gap-2 p-16">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        className="size-8 animate-spin"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={size / 2 - strokeWidth / 2}
          stroke-width={strokeWidth}
          stroke="currentColor"
          opacity="0.1"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={size / 2 - strokeWidth / 2}
          stroke-width={strokeWidth}
          stroke="currentColor"
          stroke-dasharray={`${SECTION_LENGTH}, ${CIRCLE_LENGTH - SECTION_LENGTH}`}
          stroke-dashoffset="0"
        />
      </svg>

      <div>Loading...</div>
    </div>
  );
};
