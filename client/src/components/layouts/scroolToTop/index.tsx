import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const element = document.getElementById('scroll-to-top-anchor');
    if (element) {
      element.scrollIntoView();
    }
  }, [pathname]);

  return <div id="scroll-to-top-anchor" />;
};

export default ScrollToTop;