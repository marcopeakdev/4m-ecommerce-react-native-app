import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={45}
    height={45}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M36.6701 24.5001C36.6701 30.7701 32.6201 34.2401 26.9901 36.1501C24.9901 36.8301 24.1201 38.5301 22.6401 38.5301C21.5001 38.5301 19.2401 36.2301 17.2401 35.8101C11.5801 34.6101 8.6001 30.6101 8.6001 24.5001C8.6001 16.7501 14.8901 13.6201 22.6401 13.6201C30.3901 13.6201 36.6801 16.7401 36.6801 24.5001H36.6701Z" fill="white" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M37.6301 22.51C36.2901 17.62 29.7501 16.67 22.6301 16.67C15.5101 16.67 7.93008 18.28 7.55008 22.72C7.19008 21.63 4.52008 21.82 5.84008 17.29C7.04008 13.18 12.7601 8.73996 20.2601 8.09996C21.0201 8.03996 21.6801 6.45996 22.4801 6.45996C23.2001 6.45996 24.0401 8.02996 24.7301 8.07996C32.3901 8.66996 38.5201 13.17 39.3101 17.33C40.1801 21.86 38.0301 21.49 37.6301 22.51Z" fill="white" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M22.95 12.79V16.67" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M27.4599 12.71L27.1499 15.96" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M32.1799 13.74L31.4199 16.68" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M36.16 16.28L35 18.43" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M8.23999 24.67C8.23999 24.67 11.3 21.18 20.86 20.8C23.72 20.69 25.69 20.97 27.05 20.98" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M9.67993 28.9301C9.67993 28.9301 12.2699 25.9701 20.3699 25.6501C22.7899 25.5501 24.4599 25.7901 25.6099 25.8001" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
    <Path d="M11.78 33.21C11.78 33.21 13.55 31.2 19.06 30.98C20.71 30.91 21.84 31.08 22.63 31.08" stroke="black" strokeWidth="2.5" strokeMiterlimit="10" />
  </Svg>
);

export default SvgComponent;
