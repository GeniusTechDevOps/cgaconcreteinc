// components/ScrollToTop.tsx
import { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const checkScroll = () => {
    const scrollTop = window.pageYOffset;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const totalDocScrollLength = docHeight - winHeight;
    const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);

    setScrollPercentage(scrollPosition);

    if (!isVisible && scrollTop > 400) {
      setIsVisible(true);
    } else if (isVisible && scrollTop <= 400) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isVisible]);

  // Función para hacer scroll hasta el top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed bottom-24 left-6 cursor-pointer z-40"
      onClick={scrollToTop}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="bg-secondary hover:bg-bg2 rounded-full"
      >
        <circle
          cx="25"
          cy="25"
          r="21"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
          style={{
            strokeDasharray: `${2 * Math.PI * 21}`,
            strokeDashoffset: `${
              (1 - scrollPercentage / 100) * 2 * Math.PI * 21
            }`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <i className="fas fa-chevron-up" aria-hidden></i>
      </div>
    </div>
  );
};

export default ScrollToTop;
