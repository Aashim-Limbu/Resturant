import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

const ScrollComponent = () => {
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop.current) {
        // Scrolling down
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        if (currentScroll < maxScroll) {
          window.scrollTo({
            top: currentScroll + 30,
            behavior: "smooth",
          });
        }
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the page for initial scroll
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      {/* Your content here */}
      <Navbar />
      <Home />
    </div>
  );
};

export default ScrollComponent;
