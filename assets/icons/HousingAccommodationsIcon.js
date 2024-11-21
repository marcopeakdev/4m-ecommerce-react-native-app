import React from 'react';
import { Icon } from 'native-base';
import { Path, G } from 'react-native-svg';

const HousingAccommodationsIcon = () => {
  return (
    <Icon viewBox="0 0 256 256">
      <G
        fillRule="nonezero"
        fill="#202020"
        scale={0.9}
        origin="100,100"
      >
        <Path d="M128,23,0,114.56H29.53V233h193V114.56H256ZM109.85,212.44V165h31.27v47.48Zm93.16,1H160.64v-68H90.33v68H49.05v-110L128,47l75,53.66Z" />
      </G>
    </Icon>
  );
};

export default HousingAccommodationsIcon;
