import { Dimensions } from 'react-native';

import ConferenceRoomImg from '../../../assets/images/ConferenceRoom.png';
import DeskImage from '../../../assets/images/desk-image.png';

export const Features = [
  {
    imgSource: ConferenceRoomImg,
    title: 'Conference Room 12',
    content: 'Friday • March 11, 2022 • 3:00pm-6:00pm'
  },
  {
    imgSource: ConferenceRoomImg,
    title: 'Conference Room 12',
    content: 'Friday • March 11, 2022 • 3:00pm-6:00pm'
  },
  {
    imgSource: ConferenceRoomImg,
    title: 'Conference Room 12',
    content: 'Friday • March 11, 2022 • 3:00pm-6:00pm'
  }
];

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.73);

export const DesksArr = [
  { imgSource: DeskImage },
  { imgSource: DeskImage },
  { imgSource: DeskImage }
];
