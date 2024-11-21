import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const newUUID = () => {
  return uuidv4();
};

export default newUUID;
