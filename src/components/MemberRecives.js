import React from 'react';
import {
    VStack,
    Text,
    View,
} from 'native-base';
import MemberIcon from './memberIcon';
import WifiIcon from './wifiIcon';
import ChairIcon from './chair';

const MemberRecives = ({ dayPass = false }) => {
    const membershipBenefitsDetails = [
        {
            title: '24/7 Access to Private space',
            icon: ChairIcon,
        },
        {
            title: '24/7 Access to coworking wifi',
            icon: WifiIcon,
        },
        {
            title: 'Member Discounts',
            icon: MemberIcon,

        },
        {
            title: '2x rewards point earned',
            icon: MemberIcon,
        },
        {
            title: 'Access to Member resources',
            icon: MemberIcon,
        },
        {
            title: 'Monthely tokens for the conference rooms',
            icon: MemberIcon,
        },
    ];
    const dayPassBenefitsDetails = [

        {
            title: 'Access to coworking wifi from 8:00am - 5:00pm',
            icon: WifiIcon,
        },

    ];

    const benefits = dayPass ? dayPassBenefitsDetails : membershipBenefitsDetails

    return (
        <VStack mb="10" alignItems="center" >
            <View w="90%" borderTopWidth="1" borderColor="lightgray" ></View>
            <View >
                <Text pt="5" pl="2" fontSize="18" textTransform="uppercase" fontWeight="extrabold" letterSpacing="5">{dayPass ? 'Day Pass Benefits' : 'Members Recieve'}</Text>
                {
                    benefits.map((item, index) => {
                        return (
                            <View key={index} ali w="90%" flexDir="row" justifyContent="space-between" alignItems="center" mt="2" h="10" >
                                <View w="10%" mr="4" alignItems="center">
                                    <item.icon />
                                </View>
                                <View w="90%">
                                    <Text lineHeight="18" fontSize="16px" pt="1">{item.title}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>

        </VStack>
    );
};

export default MemberRecives;
