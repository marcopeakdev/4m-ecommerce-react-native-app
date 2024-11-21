import React from 'react';
import { Heading } from 'native-base';

const Header = props => {
  let headingStyle = {};

  if (props.h1) {
    headingStyle = {
      fontFamily: 'heading',
      fontWeight: 900,
      fontSize: 39.81
    };
  } else if (props.h2) {
    headingStyle = { fontWeight: 900, fontSize: 33.18 };
  } else if (props.h3) {
    headingStyle = { fontWeight: 900, fontSize: 27.65 };
  } else if (props.h4) {
    headingStyle = { fontWeight: 900, fontSize: 23.04 };
  } else if (props.sub1) {
    headingStyle = { fontWeight: 700, fontSize: 23.04 };
  } else if (props.sub2) {
    headingStyle = { fontWeight: 700, fontSize: 19.2 };
  } else {
    headingStyle = { fontWeight: 900, fontSize: 33.18 };
  }

  return (
    <Heading
      size="xl"
      fontSize={headingStyle.fontSize}
      fontWeight={headingStyle.fontWeight}
      _dark={{ color: 'white' }}
      _light={{ color: 'black' }}
      {...props}
    >
      {props.children}
    </Heading>
  );
};

export default Header;
