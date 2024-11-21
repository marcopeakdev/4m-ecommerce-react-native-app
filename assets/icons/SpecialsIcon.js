import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const SpecialsIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 33 33',
    path: [
      <Path
        d="M30.663 24.2047H1.75195V27.0987H30.663V24.2047Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M26.4618 28.7693H5.87549V31.6632H26.4618V28.7693Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M30.7803 8.54259C31.2624 8.30283 31.702 7.95865 32.059 7.51134C33.3674 5.87165 33.0967 3.474 31.4583 2.1656C29.8186 0.857202 27.421 1.12662 26.1126 2.7663C25.7529 3.21747 25.5054 3.7331 25.3791 4.27966C20.5387 2.34478 14.7946 3.69829 11.3799 7.97798L10.4775 9.10849L29.4538 24.2485L30.3562 23.118C33.7993 18.8022 33.816 12.8416 30.7816 8.54259H30.7803ZM28.3749 4.57099C28.5541 4.3454 28.8196 4.22939 29.0877 4.22939C29.2862 4.22939 29.4873 4.29384 29.6549 4.4279C30.0468 4.74115 30.1112 5.31478 29.7993 5.70665C29.4861 6.09853 28.9124 6.16298 28.5205 5.85103C28.3311 5.69892 28.2112 5.48236 28.1841 5.2413C28.157 5.00025 28.2254 4.76177 28.3775 4.57228L28.3749 4.57099ZM28.9073 20.1119L14.6309 8.72177C16.063 7.40822 17.8664 6.58322 19.8336 6.36279C22.2866 6.08693 24.7011 6.78302 26.6321 8.32345C30.2311 11.1955 31.1141 16.2293 28.9073 20.1132V20.1119Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M5.7041 8.80559H4.29902V7.40051H1.40508V8.80559H0V11.6995H1.40508V13.1046H4.29902V11.6995H5.7041V8.80559Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M16.9307 18.2737H15.5256V16.8687H12.6316V18.2737H11.2266V21.1677H12.6316V22.5715H15.5256V21.1677H16.9307V18.2737Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M6.31748 17.9321H3.37842V20.8712H6.31748V17.9321Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M9.98887 1.41022H7.0498V4.34928H9.98887V1.41022Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default SpecialsIcon;
