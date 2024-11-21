import * as React from 'react';
import Svg, {
  Path,
  Circle,
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Circle xmlns="http://www.w3.org/2000/svg" cx="14.5" cy="14.5" r="14" fill="white" stroke="#202020"/>
    <Path xmlns="http://www.w3.org/2000/svg" d="M22.3412 15.1147L22.3412 13.8558L15.1148 13.8558V6.62944H13.8559V13.8558L6.62951 13.8558L6.62951 15.1147L13.8559 15.1147V22.3411H15.1148V15.1147L22.3412 15.1147Z" fill="#202020" stroke="#202020"/>
  </Svg>
);

export default SvgComponent;
