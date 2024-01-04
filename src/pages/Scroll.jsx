import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

const Scroll = () => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const scrollStep = 1; // Adjust this value to control the scroll speed

  const animateScroll = (timestamp) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;

      window.scrollBy(0, scrollStep);

      // You can adjust the condition as needed based on your scrolling requirements
      if (
        window.pageYOffset >=
        document.body.scrollHeight - window.innerHeight
      ) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateScroll);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []); // Empty dependency array ensures it runs only once on component mount

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default Scroll;
