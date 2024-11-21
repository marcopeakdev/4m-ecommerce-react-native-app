import React from 'react';

import PropTypes from 'prop-types';

import { Text } from 'native-base';

const Typography = ({
  color,
  type,
  children,
  ...props
}) => {
  let style = {
    color: color || '#202020',
    fontFamily: 'CodecPro-Light',
    fontWeight: 400
  };

  if (type === 'light_14_21') {
    style = {
      ...style,
      fontSize: '14.22px',
      lineHeight: '21px',
      fontWeight: 300
    };
  }

  if (type === 'light_16_21') {
    style = {
      ...style,
      fontSize: '16px',
      lineHeight: '21px',
      fontWeight: 200
    };
  }

  if (type === 'normal_14_uppercase') {
    style = {
      ...style,
      fontSize: '14.22px',
      textTransform: 'uppercase'
    };
  }

  if (type === 'normal_14_16') {
    style = {
      ...style,
      fontSize: '14.22px'
    };
  }

  if (type === 'normal_14_12_uppercase') {
    style = {
      ...style,
      fontSize: '14.22px',
      lineHeight: '12px',
      textTransform: 'uppercase'
    };
  }

  if (type === 'normal_14_21') {
    style = {
      ...style,
      fontSize: '14.22px',
      lineHeight: '21px'
    };
  }

  if (type === 'semi_bold_14_12') {
    style = {
      ...style,
      fontSize: '14.22px',
      lineHeight: '12px',
      fontFamily: 'CodecPro-Bold'
    };
  }

  if (type === 'semi_bold_14_12_uppercase') {
    style = {
      ...style,
      fontSize: '14.22px',
      lineHeight: '12px',
      textTransform: 'uppercase',
      fontFamily: 'CodecPro-Bold'
    };
  }

  if (type === 'semi_bold_14_uppercase') {
    style = {
      ...style,
      fontSize: '14.22px',
      textTransform: 'uppercase',
      fontFamily: 'CodecPro-Bold'
    };
  }

  if (type === 'semi_bold_14_22_uppercase') {
    style = {
      ...style,
      fontSize: '14.22px',
      textTransform: 'uppercase',
      fontFamily: 'CodecPro-Bold',
      lineHeight: '22px'
    };
  }

  if (type === 'semi_bold_16_14_uppercase') {
    style = {
      ...style,
      fontSize: '16px',
      lineHeight: '14px',
      fontFamily: 'CodecPro-Bold',
      textTransform: 'uppercase'
    };
  }

  if (type === 'semi_bold_19_16_uppercase') {
    style = {
      ...style,
      fontSize: '19.2',
      lineHeight: '16px',
      fontFamily: 'CodecPro-Bold',
      textTransform: 'uppercase'
    };
  }

  if (type === 'semi_bold_23_20_uppercase') {
    style = {
      ...style,
      fontSize: '23px',
      lineHeight: '20px',
      fontFamily: 'CodecPro-Bold',
      textTransform: 'uppercase'
    };
  }

  if (type === 'semi_bold_33_28_uppercase') {
    style = {
      ...style,
      fontSize: '33px',
      lineHeight: '28px',
      fontFamily: 'CodecPro-Bold',
      textTransform: 'uppercase'
    };
  }

  if (type === 'bold_22_20') {
    style = {
      ...style,
      fontSize: '22.78px',
      lineHeight: '20px',
      fontFamily: 'CodecPro-ExtraBold'
    };
  }

  if (type === 'bold_22_20_uppercase') {
    style = {
      ...style,
      fontSize: '22.78px',
      lineHeight: '20px',
      textTransform: 'uppercase',
      fontFamily: 'CodecPro-ExtraBold'
    };
  }

  if (type === 'bold_20_28') {
    style = {
      ...style,
      fontSize: '20px',
      lineHeight: '28px',
      fontFamily: 'CodecPro-ExtraBold'
    };
  }


  return (
    <Text style={{ ...style }} {...props}>
      {children}
    </Text>
  );
};

Typography.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  color: PropTypes.string
};

export default Typography;
