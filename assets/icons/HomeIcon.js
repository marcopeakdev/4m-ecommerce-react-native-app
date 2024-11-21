import React from 'react';
import { Icon, Text } from 'native-base';
import { Path, G } from 'react-native-svg';

export default HomeIcon = props => {
  const isListItem = props.isListItem
    ? props.isListItem
    : false;
  const isHeader = props.isHeader ? props.isHeader : false;
  const scale = isListItem
    ? '.7'
    : props.size === 'small'
    ? '.6'
    : '1';
  const fillColor = props.props?.color
    ? props.props.color
    : props.color
    ? props.color
    : '#202020';

  return (
    <>
      <Icon viewBox="0 0 256 256">
        <G
          fillRule="nonezero"
          fill="none"
          scale={scale}
          origin="100,100"
        >
          <Path
            d="M256,96H127.91A159.13,159.13,0,0,0,160,0H96A96.11,96.11,0,0,1,.06,96H0v64H165.49l-96,96H160l96-96Z"
            fill={`${fillColor}`}
          />
        </G>
      </Icon>
      {isHeader && (
        <Text
          variant="bottomTab"
          mt={2}
          color={`${fillColor}`}
        >
          home
        </Text>
      )}
    </>
  );
};
