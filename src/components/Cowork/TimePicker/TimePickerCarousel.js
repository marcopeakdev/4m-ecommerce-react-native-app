import { Box, Text } from 'native-base';
import * as React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import availabilityTime from '../availabilityTime';


const TimePickerCarousel = ({ ...props }) => {

    const [activeIndex, setActiveIndex] = React.useState(0)

    const _renderItem = ({ item, index }) => {
        return (
            <Box borderColor={'black'} alignItems={'center'}>
                {<Text p={4} textAlign={'center'} fontWeight={'extrabold'} style={[activeIndex === index ? styles.current : activeIndex - index === 1 || activeIndex - index === -1 ? styles.near : activeIndex - index === 2 || activeIndex - index === -2 ? styles.nearLow : styles.nearLowest]} >
                    {item.time}
                    {item.isDay ? ' am' : ' pm'}
                </Text>
                }
            </Box>
        )
    }

    React.useEffect(() => {
        props.setSelectedTime(availabilityTime[activeIndex]);
    }, [activeIndex])


    return (
        <View style={{ position: 'relative' }}>
            <Carousel
                layout={"default"}
                ref={ref => ref}
                data={availabilityTime}
                sliderHeight={360}
                itemHeight={55}
                vertical
                removeClippedSubviews={false}
                renderItem={_renderItem}
                onSnapToItem={index => setActiveIndex(index)} />
            <LinearGradient
                colors={['#9E81D2', '#4D8FFB']}
                start={{ x: 1, y: 0 }} end={{ x: 1.0, y: 1.0 }}
                style={{ height: 60, width: '100%', position: 'absolute', top: 138, zIndex: -1, alignItems: 'center', justifyContent: 'center' }}
            >
                <Box w={'98%'} backgroundColor="#fff" style={{ height: 53 }}></Box>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    current: {
        fontSize: 28
    },
    near: {
        fontSize: 25
    },
    nearLow: {
        fontSize: 22
    },
    nearLowest: {
        fontSize: 18
    },

});

export default TimePickerCarousel