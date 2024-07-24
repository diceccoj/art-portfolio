import { ReactNode, useEffect, createRef, useState } from "react";

interface Props {
  children?: ReactNode | null;
  className?: string;
}

//allows for any element to gradually appear on screen
const RevealOnScroll = ({ children, className }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    });

    ref.current != null && scrollObserver.observe(ref.current);

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);

  const classes = `transition-opacity duration-1000 
        ${isVisible ? "animate animate-phase-in" : "opacity-0"}`;

  return (
    <div ref={ref} className={classes + " " + className}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
