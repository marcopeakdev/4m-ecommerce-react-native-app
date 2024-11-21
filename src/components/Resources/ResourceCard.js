import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Pressable, Image, View } from 'native-base';

import Typography from 'src/components/Typography';

import ResourceDetailsModal from 'src/components/Cowork/ResourceDetailsModal';

const ResourceCard = ({ title, details, image }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ResourceDetailsModal
        {...{ showModal, setShowModal }}
      />
      <Pressable
        bgColor="#FFFFFF"
        shadow={2}
        flexDir="row"
        justifyContent="space-between"
        height="85px"
        mb="18px"
        rounded="10px"
        pl="18px"
        onPress={() => setShowModal(true)}
      >
        <View flexDir="column" justifyContent="center">
          <Typography type="semi_bold_14_12" mb="6px">
            {title}
          </Typography>
          <Typography type="normal_14_16">
            {details}
          </Typography>
        </View>
        <Image source={image} borderRightRadius="10px" />
      </Pressable>
    </>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  image: PropTypes.string
};

export default ResourceCard;
