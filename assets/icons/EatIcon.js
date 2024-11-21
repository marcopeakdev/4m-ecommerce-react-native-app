import React from 'react';
import { Icon } from 'native-base';
import { Path, Rect, Polygon, G } from 'react-native-svg';

const EventsIcon = props => {
  const fillColor = props.color ? props.color : '#202020';

  return (
    <Icon viewBox="-50 0 876 876">
      <G
        fillRule="nonezero"
        fill={`${fillColor}`}
        scale={0.9}
        origin="100,100"
      >
        <Path d="M766.5 730V345.468C810.14 320.224 839.5 273.041 839.5 219C839.5 138.366 774.134 73 693.5 73H182.5C101.866 73 36.5 138.366 36.5 219C36.5 273.041 65.8605 320.224 109.5 345.468V730C109.5 770.317 142.183 803 182.5 803H693.5C733.817 803 766.5 770.317 766.5 730ZM693.5 730H182.5V303.362L146.053 282.279C123.572 269.274 109.5 245.402 109.5 219C109.5 178.683 142.183 146 182.5 146H693.5C733.817 146 766.5 178.683 766.5 219C766.5 245.402 752.428 269.274 729.947 282.279L693.5 303.362V730Z" />
      </G>
    </Icon>
  );
};

export default EventsIcon;
