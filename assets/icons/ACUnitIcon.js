import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const ACUnitIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 50 50',
    path: [
      <Path
        xmlns="https://www.w3.org/2000/svg"
        d="M45.8337 22.916H37.1462L43.8962 16.166L40.9587 13.2077L31.2503 22.916H27.0837V18.7493L36.792 9.04102L33.8337 6.10352L27.0837 12.8535V4.16602H22.917V12.8535L16.167 6.10352L13.2087 9.04102L22.917 18.7493V22.916H18.7503L9.04199 13.2077L6.10449 16.166L12.8545 22.916H4.16699V27.0827H12.8545L6.10449 33.8327L9.04199 36.791L18.7503 27.0827H22.917V31.2494L13.2087 40.9577L16.167 43.8952L22.917 37.1452V45.8327H27.0837V37.1452L33.8337 43.8952L36.792 40.9577L27.0837 31.2494V27.0827H31.2503L40.9587 36.791L43.8962 33.8327L37.1462 27.0827H45.8337V22.916Z"
        fill={color ? color : 'brand.dark'}
      />
    ]
  });
  return <Icon size={size} />;
};

export default ACUnitIcon;
