import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'native-base';

const TermCard = ({ title, content }) => {
  return (
    <Text
      fontSize="14.22px"
      lineHeight="16px"
      letterSpacing="0.07em"
      textTransform="uppercase"
      color="#202020"
      mb="15px"
      fontWeight="normal"
    >
      <Text fontFamily="CodecPro-Bold">{title}</Text>{' '}
      {content}
    </Text>
  );
};

TermCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default TermCard;
