import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollTopProp {
  children: ReactNode;
}

const ScrollTop: React.FC<ScrollTopProp> = ({ children }: ScrollTopProp) => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>{children}</>
  );
}

export default ScrollTop;