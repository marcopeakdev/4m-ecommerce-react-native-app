import React from 'react';
import PropType from 'prop-types';

import { Button } from 'native-base';

const CustomButton = ({ children, disabled, ...props }) => {
  if (disabled) {
    return (
      <Button bg="#595959" {...props}>
        {children}
      </Button>
    );
  }
  return <Button {...props}>{children}</Button>;
};

CustomButton.propTypes = {
  disabled: PropType.bool,
  children: PropType.any
};

export default CustomButton;
