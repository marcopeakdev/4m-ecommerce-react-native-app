import React from 'react';
import { Icon } from 'native-base';
import { Path, Rect, Polygon, G } from 'react-native-svg';

const EventsIcon = props => {
  const fillColor = props.color ? props.color : '#202020';

  return (
    <Icon viewBox="-50 -50 876 876">
      <G
        fillRule="nonezero"
        fill={`${fillColor}`}
        scale={0.9}
        origin="100,100"
      >
        <Path d="M318.364 676.614V716.409H238.773V796H636.727V716.409H557.136V676.614H795.909C839.866 676.614 875.5 640.98 875.5 597.023V79.6819C875.5 35.725 839.866 0.0909424 795.909 0.0909424H79.5909C35.6341 0.0909424 0 35.725 0 79.6819V597.023C0 640.98 35.6341 676.614 79.5909 676.614H318.364ZM795.909 597.023H79.5909V79.6819H795.909V597.023Z" />
      </G>
    </Icon>
  );
};

export default EventsIcon;
