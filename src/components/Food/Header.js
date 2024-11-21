import { Heading, Image } from 'native-base'
import React from 'react'
import { View } from 'react-native'

const Header = ({ imageHeight }) => {
    return (
        <View>
            <Image source={{
                uri: "https://images.ctfassets.net/5iqr9b2b3rso/sbQkBIqvrrQw3PFiQJLYG/1d819a1fbc16d65054c30e846597669b/brasserie.jpg"
            }} alt="Alternate Text"
                w={'96'}
                h={'64'}
                resizeMode="cover"
            />

            <Heading
                variant="header2"
                fontSize="2xl"
                color='white'
                mt="-8"
                mx="4"
                mb="4"
            >
                {'Venue Brasserie'.toUpperCase()}
            </Heading>
        </View>
    )
}

export default Header