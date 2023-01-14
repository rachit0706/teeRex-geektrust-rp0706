import { useEffect, useState } from "react";

export function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
      const debouncedResizeHandler = () => {
        if(timerId) {
            clearTimeout(timerId);
        }

        let newTimer = setTimeout(() => {
            setWidth(window.innerWidth);
        }, 100);
        setTimerId(newTimer);
      }

      window.addEventListener('resize', debouncedResizeHandler);
      return () => window.removeEventListener('resize', debouncedResizeHandler);
    }, []);

    return width;
}
  