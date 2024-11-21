import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChairIcon = ({ width = 21, height = 27 }) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <Path
      d="M17.792 10.583a2.925 2.925 0 0 0 2.917-2.916V3.292A2.925 2.925 0 0 0 17.792.375H3.209A2.925 2.925 0 0 0 .292 3.292v4.375a2.925 2.925 0 0 0 2.917 2.916h1.458V13.5H3.209a2.925 2.925 0 0 0-2.917 2.917v10.208h2.917V22.25h14.583v4.375h2.917V16.417a2.925 2.925 0 0 0-2.917-2.917h-1.458v-2.917h1.458ZM3.209 7.667V3.292h14.583v4.375H3.209Zm14.583 11.666H3.209v-2.916h14.583v2.916ZM13.417 13.5H7.584v-2.917h5.833V13.5Z"
      fill="#202020"
    />
  </Svg>
);

export default ChairIcon;
