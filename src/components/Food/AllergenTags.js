import {
  View,
  ScrollView,
  HStack,
  Text
} from 'native-base';
import React from 'react';
import ShellfishIcon from '../../../assets/icons/ShellfishIcon';
import DairyIcon from '../../../assets/icons/DairyIcon';
import VegetarianIcon from '../../../assets/icons/VegetarianIcon';
import VeganIcon from '../../../assets/icons/VeganIcon';
import EggsIcon from '../../../assets/icons/EggIcon';
import PeanutIcon from '../../../assets/icons/PeanutIcon';
import SesameIcon from '../../../assets/icons/SesameIcon';
import SoyIcon from '../../../assets/icons/SoyIcon';
import TreenutIcon from '../../../assets/icons/TreenutIcon';

const ICON_LIST = {
  Shellfish: <ShellfishIcon />,
  Dairy: <DairyIcon />,
  Vegetarian: <VegetarianIcon />,
  Vegan: <VeganIcon />,
  Egg: <EggsIcon />,
  Peanuts: <PeanutIcon />,
  'Sesame Seeds': <SesameIcon />,
  Soy: <SoyIcon />,
  'Tree Nut': <TreenutIcon />
};

const AllergenTags = props => {
  const { data } = props;

  return (
    <ScrollView
      pt={2}
      pb={2}
      borderBottomColor="#eeeeee90"
      borderBottomWidth="1"
    >
      <HStack>
        {data.map((item, index) => {
          if (ICON_LIST[item.name]) {
            return (
              <View
                mx={2}
                justifyContent="center"
                alignItems="center"
                key={`${index}-${item.guid}`}
              >
                {ICON_LIST[item.name]}
                <Text
                  mt={1}
                  fontSize="14.22px"
                  fontWeight="400"
                  lineHeight="16px"
                >
                  {item.name}
                </Text>
              </View>
            );
          }
        })}
      </HStack>
    </ScrollView>
  );
};

export default AllergenTags;
