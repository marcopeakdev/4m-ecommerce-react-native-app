import React, { useState } from 'react';

import { View, ScrollView } from 'native-base';

import Header from 'src/components/Cowork/Header';
import ResourceCard from 'src/components/Resources/ResourceCard';
import Filter from 'src/components/Resources/Filter';

import resourcesImg from '../../../assets/images/resource-img.png';

const resources = [
  {
    title: 'Confrence room 12',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: 'Conference rooms'
  },
  {
    title: 'Confrence room 12',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: 'Conference rooms'
  },
  {
    title: 'Confrence room 12',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: 'Conference rooms'
  },
  {
    title: '3D Scanner',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: '3D Scanner'
  },
  {
    title: 'Phone Booths',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: 'Phone Booths'
  },
  {
    title: '3D Scanner',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: '3D Scanner'
  },
  {
    title: 'Phone Booths',
    details: '$25.00/hour or 5 tokens',
    image: resourcesImg,
    type: 'Phone Booths'
  }
];

const filters = [
  'Conference rooms',
  'Phone Booths',
  '3D Scanner'
];

const Resources = () => {
  const [selectedFilters, setSelectedFilters] = useState(
    []
  );

  const removeFilter = item => {
    const index = selectedFilters.findIndex(
      _f => _f === item
    );
    if (index !== -1) {
      const cloneSelectedFilters = [...selectedFilters];
      cloneSelectedFilters.splice(index, 1);
      setSelectedFilters([...cloneSelectedFilters]);
    }
  };

  const addFilter = item => {
    const index = selectedFilters.findIndex(
      _f => _f === item
    );
    if (index == -1) {
      console.log('[...selectedFilters, item]', [
        ...selectedFilters,
        item
      ]);
      const cloneSelectedFilters = [
        ...selectedFilters,
        item
      ];
      setSelectedFilters([...cloneSelectedFilters]);
    }
  };

  return (
    <View bgColor="#FFF" h="100%">
      <Header title="Resources" />
      <View pt="20px">
        <View py="8px" ml="18px">
          <ScrollView horizontal={true} py="4">
            {filters?.map((_filter, index) => (
              <Filter
                key={index}
                title={_filter}
                selected={selectedFilters?.includes(
                  _filter
                )}
                removeFilter={removeFilter}
                addFilter={addFilter}
              />
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          <View px="18px" pt="32px" pb="100px">
            {resources
              ?.filter(
                _res =>
                  selectedFilters.includes(_res.type) ||
                  selectedFilters.length === 0
              )
              ?.map((_resource, index) => (
                <ResourceCard {..._resource} key={index} />
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Resources;
