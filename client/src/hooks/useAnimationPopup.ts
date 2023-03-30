import { useEffect, useState } from 'react';


export const useAnimationPopup = ({ isActive, closeDispatch }: { isActive: boolean, closeDispatch: () => void }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setActive(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const onClosePopup = () => {
    setActive(false);
    const timer = setTimeout(() => {
      closeDispatch();
    }, 200);
    return () => clearTimeout(timer);
  };

  return {
    active, onClosePopup,
  };
};