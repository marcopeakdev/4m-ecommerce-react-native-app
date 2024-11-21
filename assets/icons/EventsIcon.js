import React from 'react';
import { Icon } from 'native-base';
import { Path, Rect, Polygon, G } from 'react-native-svg';

const EventsIcon = props => {
  const fillColor = props.color ? props.color : '#202020';

  return (
    <Icon viewBox="0 0 256 256">
      <G
        fillRule="nonezero"
        fill={`${fillColor}`}
        scale={0.9}
        origin="100,100"
      >
        <Rect
          x="97.75"
          y="23.7"
          width="22.42"
          height="22.49"
        />

        <Rect y="212.04" width="22.42" height="22.49" />

        <Rect y="212.04" width="22.42" height="22.49" />

        <Rect y="212.04" width="22.42" height="22.49" />

        <Rect
          x="22.14"
          y="233.91"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="22.41"
          y="189.64"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="45.61"
          y="212.04"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="67.75"
          y="233.91"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="22.41"
          y="23.74"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="0.27"
          y="1.87"
          width="22.42"
          height="22.49"
        />

        <Rect y="46.14" width="22.42" height="22.49" />

        <Path d="M255.94,234.49v-105H135.17V214.8a21.06,21.06,0,1,0,22.36,21h.06V185h75.93v29.67a21.06,21.06,0,1,0,22.48,21C256,235.25,256,234.87,255.94,234.49Zm-98.35-72V152h75.93v10.58Z" />

        <Rect
          x="165.73"
          y="23.52"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="140.39"
          y="68.56"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="188.4"
          y="1.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="142.79"
          y="1.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="142.79"
          y="1.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="142.79"
          y="1.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="211.08"
          y="23.52"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="233.21"
          y="45.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="233.21"
          y="45.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="233.21"
          y="45.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="187.41"
          y="45.38"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="187.41"
          y="90.97"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="210.65"
          y="68.09"
          width="22.42"
          height="22.49"
        />

        <Rect
          x="233.48"
          y="1.11"
          width="22.42"
          height="22.49"
        />

        <Polygon points="70.02 68.81 57.94 98.89 25.6 101.08 50.47 121.87 42.56 153.31 70.02 136.07 97.47 153.31 89.57 121.87 114.44 101.08 82.1 98.89 70.02 68.81 70.02 68.81" />
      </G>
    </Icon>
  );
};

export default EventsIcon;
