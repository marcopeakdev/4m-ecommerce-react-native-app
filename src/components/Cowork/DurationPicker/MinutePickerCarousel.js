import { Box, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import Carousel from 'react-native-snap-carousel';

const MinutePickerCarousel = ({ ...props }) => {

    let gap = -15
    const minutes = Array.from({ length: 4 }, (minute, index) => {
        gap += 15
        return gap
    })

    const [activeIndex, setActiveIndex] = React.useState(0)
    const [Minutes, setMinutes] = React.useState(minutes)

    const _renderItem = ({ item, index }) => {
        return (
            <Box alignItems={'flex-start'}>
                {
                    <Text p={4} textAlign={'center'} fontWeight={'extrabold'} fontSize={'2xl'}>
                        {item}
                        <Text style={{ fontSize: 20 }}> Min</Text>
                    </Text>
                }
            </Box>
        )
    }

    useEffect(() => {
        props.setSelectedDurationMinutes(Minutes[activeIndex]);
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
                    left: 180,
                    top: 40
                }}
            />
            <Carousel
                layout={"default"}
                ref={ref => ref}
                data={Minutes}
                sliderHeight={200}
                itemHeight={70}
                vertical
                removeClippedSubviews={false}
                renderItem={_renderItem}
                onSnapToItem={index => setActiveIndex(index)} />
            <LinearGradient
                colors={['#FAFAFA', '#FFFFFF00']}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 0.0, y: 0.0 }}
                style={{
                    height: 100,
                    width: 100,
                    position: 'absolute',
                    zIndex: 1,
                    left: 180,
                    bottom: 40
                }}
            />
        </>
    );
}


export default MinutePickerCarousel