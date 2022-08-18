import { useEffect, useState } from "react";
import { windowSizeType } from "./types";

export const useWindowSize = (): windowSizeType => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<windowSizeType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      const handleResize = () => {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Call handler right away so state gets updated with initial window size
      handleResize();
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};
