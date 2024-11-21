import { Box, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import Carousel from 'react-native-snap-carousel';

const HourPickerCarousel = ({ ...props }) => {

    const [activeIndex, setActiveIndex] = React.useState(0)
    const [time, setTime] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

    const _renderItem = ({ item, index }) => {
        return (
            <Box alignItems={'flex-end'}>
                {
                    <Text p={4} textAlign={'center'} fontWeight={'extrabold'} fontSize={'2xl'}>
                        {item}
                        <Text style={{ fontSize: 20 }}> Hr</Text>
                    </Text>
                }
            </Box>
        )
    }

    useEffect(() => {
        props.setSelectedDurationHours(time[activeIndex]);
    }, [activeIndex])

    return (
        <>
            <LinearGradient
                colors={['#FAFAFA', '#FFFFFF00']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                style={{
                    height: 100,
                    width: 100,
                    position: 'absolute',
                    zIndex: 1,
                    left: 80,
                    top: 0
                }}
            />
            <Carousel
                layout={"default"}
                ref={ref => ref}
                data={time}
                sliderHeight={360}
                itemHeight={70}
                vertical
                removeClippedSubviews={false}
                renderItem={_renderItem}
                onSnapToItem={index => setActiveIndex(index)}
            />
            <LinearGradient
                colors={['#FAFAFA', '#FFFFFF00']}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 0.0, y: 0.0 }}
                style={{
                    height: 100,
                    width: 100,
                    position: 'absolute',
                    zIndex: 1,
                    left: 80,
                    bottom: 0
                }}
            />
        </>
    );
}


export default HourPickerCarousel