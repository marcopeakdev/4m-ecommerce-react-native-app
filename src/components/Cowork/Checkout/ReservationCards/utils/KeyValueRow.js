import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'native-base';

import Typography from 'src/components/Typography';

const KeyValueRow = ({ label, value }) => {
  return (
    <View
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      h="21px"
    >
      <Typography type="normal_14_21">{label}</Typography>
      <Typography
        type="semi_bold_14_12_uppercase"
        letterSpacing="0.07em"
      >
        {value}
      </Typography>
    </View>
  );
};

KeyValueRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default KeyValueRow;
