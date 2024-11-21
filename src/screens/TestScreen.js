import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default TestScreen = () => {
  const [inputField, setInputField] = useState('');

  return (
    <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, flex: 1, justifyContent: 'flex-end' }}>
      <Text style={{ margin: 10 }}>Hi</Text>
      <TextInput placeholder="Text Here" value={inputField} />
      <Button title="Click">Click</Button>
    </View>
  );
};
