import React, { useEffect, useState } from 'react';
import { Image, PresenceTransition } from 'native-base';
import icon from '../../assets/4M_ICON-gradient.png';

const BrandGradientIcon = props => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(visible => !visible);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PresenceTransition
      visible={visible}
      initial={{
        opacity: 0,
        scale: 0
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delay: 100,
          duration: 1000
        }
      }}
      exit={{
        opacity: 0,
        scale: 0,
        transition: {
          duration: 250
        }
      }}
    >
      <Image source={icon} size="lg" alt="4m" {...props} />
    </PresenceTransition>
  );
};

export default BrandGradientIcon;
